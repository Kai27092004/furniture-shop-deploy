import React, { useState, useEffect } from 'react';
import { 
    EnvelopeIcon, 
    PencilSquareIcon, 
    TrashIcon, 
    PlusIcon,
    UserGroupIcon,
    ClockIcon,
    CheckCircleIcon,
    XCircleIcon
} from '@heroicons/react/24/outline';
import {
    getEmailTemplates,
    createEmailTemplate,
    updateEmailTemplate,
    deleteEmailTemplate,
    sendEmail,
    sendEmailToAllCustomers,
    getEmailLogs,
    getEmailStats,
    adminGetAllUsers
} from '../../services/api';
import { useToast } from '../../context/ToastContext';
import Modal from '../../components/common/Modal';

const EmailManagementPage = () => {
    const { show: showToast } = useToast();
    const [activeTab, setActiveTab] = useState('send'); // 'send', 'templates', 'logs'
    
    // State cho gửi email
    const [emailForm, setEmailForm] = useState({
        recipients: [],
        subject: '',
        content: '',
        templateId: null,
        sendToAll: false
    });
    const [customers, setCustomers] = useState([]);
    const [selectedCustomers, setSelectedCustomers] = useState([]);
    const [searchCustomer, setSearchCustomer] = useState('');
    
    // State cho templates
    const [templates, setTemplates] = useState([]);
    const [showTemplateModal, setShowTemplateModal] = useState(false);
    const [editingTemplate, setEditingTemplate] = useState(null);
    const [templateForm, setTemplateForm] = useState({
        name: '',
        subject: '',
        content: '',
        description: ''
    });
    
    // State cho logs
    const [emailLogs, setEmailLogs] = useState([]);
    const [stats, setStats] = useState({
        totalSent: 0,
        totalFailed: 0,
        totalTemplates: 0
    });
    
    const [loading, setLoading] = useState(false);
    const [sending, setSending] = useState(false);

    useEffect(() => {
        loadInitialData();
    }, []);

    useEffect(() => {
        if (activeTab === 'logs') {
            loadEmailLogs();
        }
    }, [activeTab]);

    const loadInitialData = async () => {
        try {
            setLoading(true);
            const [customersRes, templatesRes, statsRes] = await Promise.all([
                adminGetAllUsers({ role: 'customer' }),
                getEmailTemplates(),
                getEmailStats()
            ]);
            setCustomers(customersRes.data);
            setTemplates(templatesRes.data);
            setStats(statsRes.data);
        } catch (error) {
            showToast('Lỗi khi tải dữ liệu: ' + (error.response?.data?.message || error.message), { type: 'error' });
        } finally {
            setLoading(false);
        }
    };

    const loadEmailLogs = async () => {
        try {
            const response = await getEmailLogs({ limit: 50 });
            setEmailLogs(response.data.logs);
        } catch (error) {
            showToast('Lỗi khi tải lịch sử email', { type: 'error' });
        }
    };

    // ==================== GỬI EMAIL ====================

    const handleSelectCustomer = (customer) => {
        if (selectedCustomers.find(c => c.id === customer.id)) {
            setSelectedCustomers(selectedCustomers.filter(c => c.id !== customer.id));
        } else {
            setSelectedCustomers([...selectedCustomers, customer]);
        }
    };

    const handleSelectAllCustomers = () => {
        if (selectedCustomers.length === customers.length) {
            setSelectedCustomers([]);
        } else {
            setSelectedCustomers([...customers]);
        }
    };

    const handleUseTemplate = (template) => {
        setEmailForm({
            ...emailForm,
            subject: template.subject,
            content: template.content,
            templateId: template.id
        });
        showToast('Đã áp dụng mẫu email: ' + template.name, { type: 'success' });
    };

    const handleSendEmail = async () => {
        try {
            if (!emailForm.sendToAll && selectedCustomers.length === 0) {
                showToast('Vui lòng chọn người nhận hoặc chọn "Gửi cho tất cả khách hàng"', { type: 'error' });
                return;
            }

            if (!emailForm.subject || !emailForm.content) {
                showToast('Vui lòng nhập tiêu đề và nội dung email', { type: 'error' });
                return;
            }

            setSending(true);

            if (emailForm.sendToAll) {
                const response = await sendEmailToAllCustomers({
                    subject: emailForm.subject,
                    content: emailForm.content
                });
                showToast(response.data.message, { type: 'success' });
            } else {
                const recipients = selectedCustomers.map(customer => ({
                    userId: customer.id,
                    email: customer.email,
                    name: customer.fullName
                }));

                const response = await sendEmail({
                    recipients,
                    subject: emailForm.subject,
                    content: emailForm.content
                });
                showToast(response.data.message, { type: 'success' });
            }

            // Reset form
            setEmailForm({
                recipients: [],
                subject: '',
                content: '',
                templateId: null,
                sendToAll: false
            });
            setSelectedCustomers([]);
            
            // Reload stats
            const statsRes = await getEmailStats();
            setStats(statsRes.data);
        } catch (error) {
            showToast('Lỗi khi gửi email: ' + (error.response?.data?.message || error.message), { type: 'error' });
        } finally {
            setSending(false);
        }
    };

    // ==================== QUẢN LÝ TEMPLATE ====================

    const handleCreateTemplate = () => {
        setEditingTemplate(null);
        setTemplateForm({
            name: '',
            subject: '',
            content: '',
            description: ''
        });
        setShowTemplateModal(true);
    };

    const handleEditTemplate = (template) => {
        setEditingTemplate(template);
        setTemplateForm({
            name: template.name,
            subject: template.subject,
            content: template.content,
            description: template.description || ''
        });
        setShowTemplateModal(true);
    };

    const handleSaveTemplate = async () => {
        try {
            if (!templateForm.name || !templateForm.subject || !templateForm.content) {
                showToast('Vui lòng điền đầy đủ thông tin', { type: 'error' });
                return;
            }

            if (editingTemplate) {
                await updateEmailTemplate(editingTemplate.id, templateForm);
                showToast('Cập nhật mẫu email thành công', { type: 'success' });
            } else {
                await createEmailTemplate(templateForm);
                showToast('Tạo mẫu email thành công', { type: 'success' });
            }

            setShowTemplateModal(false);
            const templatesRes = await getEmailTemplates();
            setTemplates(templatesRes.data);
            
            const statsRes = await getEmailStats();
            setStats(statsRes.data);
        } catch (error) {
            showToast('Lỗi: ' + (error.response?.data?.message || error.message), { type: 'error' });
        }
    };

    const handleDeleteTemplate = async (templateId) => {
        if (!window.confirm('Bạn có chắc chắn muốn xóa mẫu email này?')) {
            return;
        }

        try {
            await deleteEmailTemplate(templateId);
            showToast('Xóa mẫu email thành công', { type: 'success' });
            const templatesRes = await getEmailTemplates();
            setTemplates(templatesRes.data);
            
            const statsRes = await getEmailStats();
            setStats(statsRes.data);
        } catch (error) {
            showToast('Lỗi khi xóa mẫu email', { type: 'error' });
        }
    };

    // ==================== RENDER ====================

    const filteredCustomers = customers.filter(customer =>
        customer.fullName.toLowerCase().includes(searchCustomer.toLowerCase()) ||
        customer.email.toLowerCase().includes(searchCustomer.toLowerCase())
    );

    return (
        <div className="p-6">
            <div className="mb-6">
                <h1 className="text-3xl font-bold text-gray-800">Quản lý Email</h1>
                <p className="text-gray-600 mt-2">Gửi email cho khách hàng và quản lý mẫu email</p>
            </div>

            {/* Statistics Cards */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">Email đã gửi</p>
                            <p className="text-2xl font-bold text-green-600">{stats.totalSent}</p>
                        </div>
                        <CheckCircleIcon className="w-12 h-12 text-green-600" />
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">Email thất bại</p>
                            <p className="text-2xl font-bold text-red-600">{stats.totalFailed}</p>
                        </div>
                        <XCircleIcon className="w-12 h-12 text-red-600" />
                    </div>
                </div>

                <div className="bg-white rounded-lg shadow p-6">
                    <div className="flex items-center justify-between">
                        <div>
                            <p className="text-sm text-gray-600">Mẫu email</p>
                            <p className="text-2xl font-bold text-blue-600">{stats.totalTemplates}</p>
                        </div>
                        <EnvelopeIcon className="w-12 h-12 text-blue-600" />
                    </div>
                </div>
            </div>

            {/* Tabs */}
            <div className="bg-white rounded-lg shadow mb-6">
                <div className="border-b border-gray-200">
                    <nav className="flex -mb-px">
                        <button
                            onClick={() => setActiveTab('send')}
                            className={`py-4 px-6 text-sm font-medium border-b-2 ${
                                activeTab === 'send'
                                    ? 'border-blue-500 text-blue-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                            }`}
                        >
                            <EnvelopeIcon className="w-5 h-5 inline-block mr-2" />
                            Gửi Email
                        </button>
                        <button
                            onClick={() => setActiveTab('templates')}
                            className={`py-4 px-6 text-sm font-medium border-b-2 ${
                                activeTab === 'templates'
                                    ? 'border-blue-500 text-blue-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                            }`}
                        >
                            <PencilSquareIcon className="w-5 h-5 inline-block mr-2" />
                            Mẫu Email
                        </button>
                        <button
                            onClick={() => setActiveTab('logs')}
                            className={`py-4 px-6 text-sm font-medium border-b-2 ${
                                activeTab === 'logs'
                                    ? 'border-blue-500 text-blue-600'
                                    : 'border-transparent text-gray-500 hover:text-gray-700 hover:border-gray-300'
                            }`}
                        >
                            <ClockIcon className="w-5 h-5 inline-block mr-2" />
                            Lịch sử
                        </button>
                    </nav>
                </div>

                <div className="p-6">
                    {/* TAB: GỬI EMAIL */}
                    {activeTab === 'send' && (
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* Left Column: Customer Selection */}
                            <div>
                                <h3 className="text-lg font-semibold mb-4">Chọn người nhận</h3>
                                
                                <div className="mb-4">
                                    <label className="flex items-center space-x-2">
                                        <input
                                            type="checkbox"
                                            checked={emailForm.sendToAll}
                                            onChange={(e) => {
                                                setEmailForm({ ...emailForm, sendToAll: e.target.checked });
                                                if (e.target.checked) {
                                                    setSelectedCustomers([]);
                                                }
                                            }}
                                            className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                        />
                                        <span className="text-sm font-medium">Gửi cho tất cả khách hàng ({customers.length} người)</span>
                                    </label>
                                </div>

                                {!emailForm.sendToAll && (
                                    <>
                                        <input
                                            type="text"
                                            placeholder="Tìm kiếm khách hàng..."
                                            value={searchCustomer}
                                            onChange={(e) => setSearchCustomer(e.target.value)}
                                            className="w-full px-4 py-2 border border-gray-300 rounded-lg mb-3"
                                        />

                                        <div className="mb-3">
                                            <button
                                                onClick={handleSelectAllCustomers}
                                                className="text-sm text-blue-600 hover:text-blue-800"
                                            >
                                                {selectedCustomers.length === customers.length ? 'Bỏ chọn tất cả' : 'Chọn tất cả'}
                                            </button>
                                            <span className="text-sm text-gray-600 ml-3">
                                                Đã chọn: {selectedCustomers.length}/{customers.length}
                                            </span>
                                        </div>

                                        <div className="border border-gray-300 rounded-lg max-h-96 overflow-y-auto">
                                            {filteredCustomers.map((customer) => (
                                                <label
                                                    key={customer.id}
                                                    className="flex items-center p-3 hover:bg-gray-50 cursor-pointer border-b border-gray-200 last:border-b-0"
                                                >
                                                    <input
                                                        type="checkbox"
                                                        checked={selectedCustomers.some(c => c.id === customer.id)}
                                                        onChange={() => handleSelectCustomer(customer)}
                                                        className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                                                    />
                                                    <div className="ml-3">
                                                        <p className="text-sm font-medium text-gray-900">{customer.fullName}</p>
                                                        <p className="text-xs text-gray-500">{customer.email}</p>
                                                    </div>
                                                </label>
                                            ))}
                                        </div>
                                    </>
                                )}
                            </div>

                            {/* Right Column: Email Content */}
                            <div>
                                <h3 className="text-lg font-semibold mb-4">Nội dung email</h3>

                                {/* Template Selector */}
                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Sử dụng mẫu có sẵn (tùy chọn)
                                    </label>
                                    <select
                                        onChange={(e) => {
                                            if (e.target.value) {
                                                const template = templates.find(t => t.id === parseInt(e.target.value));
                                                if (template) handleUseTemplate(template);
                                            }
                                        }}
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                    >
                                        <option value="">-- Chọn mẫu email --</option>
                                        {templates.map((template) => (
                                            <option key={template.id} value={template.id}>
                                                {template.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Tiêu đề email *
                                    </label>
                                    <input
                                        type="text"
                                        value={emailForm.subject}
                                        onChange={(e) => setEmailForm({ ...emailForm, subject: e.target.value })}
                                        placeholder="Nhập tiêu đề email..."
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                                    />
                                </div>

                                <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 mb-2">
                                        Nội dung email * (hỗ trợ HTML)
                                    </label>
                                    <textarea
                                        value={emailForm.content}
                                        onChange={(e) => setEmailForm({ ...emailForm, content: e.target.value })}
                                        placeholder="Nhập nội dung email... (có thể dùng HTML)&#10;&#10;Biến có sẵn: {{customerName}}, {{email}}"
                                        rows="12"
                                        className="w-full px-4 py-2 border border-gray-300 rounded-lg font-mono text-sm"
                                    />
                                    <p className="text-xs text-gray-500 mt-1">
                                        Sử dụng {`{{customerName}}`} để hiển thị tên khách hàng
                                    </p>
                                </div>

                                <button
                                    onClick={handleSendEmail}
                                    disabled={sending}
                                    className="w-full bg-blue-600 text-white px-6 py-3 rounded-lg hover:bg-blue-700 disabled:bg-gray-400 disabled:cursor-not-allowed"
                                >
                                    {sending ? (
                                        <span className="flex items-center justify-center">
                                            <svg className="animate-spin h-5 w-5 mr-3" viewBox="0 0 24 24">
                                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" fill="none"></circle>
                                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                                            </svg>
                                            Đang gửi...
                                        </span>
                                    ) : (
                                        'Gửi Email'
                                    )}
                                </button>
                            </div>
                        </div>
                    )}

                    {/* TAB: MẪU EMAIL */}
                    {activeTab === 'templates' && (
                        <div>
                            <div className="flex justify-between items-center mb-4">
                                <h3 className="text-lg font-semibold">Danh sách mẫu email</h3>
                                <button
                                    onClick={handleCreateTemplate}
                                    className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 flex items-center"
                                >
                                    <PlusIcon className="w-5 h-5 mr-2" />
                                    Tạo mẫu mới
                                </button>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                {templates.map((template) => (
                                    <div key={template.id} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition">
                                        <div className="flex justify-between items-start mb-2">
                                            <h4 className="text-lg font-semibold text-gray-800">{template.name}</h4>
                                            <div className="flex space-x-2">
                                                <button
                                                    onClick={() => handleEditTemplate(template)}
                                                    className="text-blue-600 hover:text-blue-800"
                                                >
                                                    <PencilSquareIcon className="w-5 h-5" />
                                                </button>
                                                <button
                                                    onClick={() => handleDeleteTemplate(template.id)}
                                                    className="text-red-600 hover:text-red-800"
                                                >
                                                    <TrashIcon className="w-5 h-5" />
                                                </button>
                                            </div>
                                        </div>
                                        <p className="text-sm text-gray-600 mb-2">{template.description}</p>
                                        <p className="text-xs text-gray-500 mb-2"><strong>Tiêu đề:</strong> {template.subject}</p>
                                        <div className="text-xs text-gray-400 bg-gray-50 p-2 rounded max-h-24 overflow-y-auto">
                                            <div dangerouslySetInnerHTML={{ __html: template.content }} />
                                        </div>
                                    </div>
                                ))}
                            </div>

                            {templates.length === 0 && (
                                <div className="text-center py-12 text-gray-500">
                                    <EnvelopeIcon className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                                    <p>Chưa có mẫu email nào. Hãy tạo mẫu đầu tiên!</p>
                                </div>
                            )}
                        </div>
                    )}

                    {/* TAB: LỊCH SỬ */}
                    {activeTab === 'logs' && (
                        <div>
                            <h3 className="text-lg font-semibold mb-4">Lịch sử gửi email</h3>
                            
                            <div className="overflow-x-auto">
                                <table className="min-w-full divide-y divide-gray-200">
                                    <thead className="bg-gray-50">
                                        <tr>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Người nhận</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Email</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Tiêu đề</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Trạng thái</th>
                                            <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase">Thời gian</th>
                                        </tr>
                                    </thead>
                                    <tbody className="bg-white divide-y divide-gray-200">
                                        {emailLogs.map((log) => (
                                            <tr key={log.id}>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">
                                                    {log.recipientName || 'N/A'}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {log.recipientEmail}
                                                </td>
                                                <td className="px-6 py-4 text-sm text-gray-900">
                                                    {log.subject}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap">
                                                    {log.status === 'sent' ? (
                                                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                                            Đã gửi
                                                        </span>
                                                    ) : (
                                                        <span className="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-red-100 text-red-800">
                                                            Thất bại
                                                        </span>
                                                    )}
                                                </td>
                                                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                                    {new Date(log.sentAt).toLocaleString('vi-VN')}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>

                            {emailLogs.length === 0 && (
                                <div className="text-center py-12 text-gray-500">
                                    <ClockIcon className="w-16 h-16 mx-auto mb-4 text-gray-300" />
                                    <p>Chưa có lịch sử gửi email</p>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>

            {/* Template Modal */}
            <Modal
                isOpen={showTemplateModal}
                onClose={() => setShowTemplateModal(false)}
                title={editingTemplate ? 'Chỉnh sửa mẫu email' : 'Tạo mẫu email mới'}
            >
                <div className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Tên mẫu *
                        </label>
                        <input
                            type="text"
                            value={templateForm.name}
                            onChange={(e) => setTemplateForm({ ...templateForm, name: e.target.value })}
                            placeholder="Ví dụ: Khuyến mãi tháng 12"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Mô tả
                        </label>
                        <input
                            type="text"
                            value={templateForm.description}
                            onChange={(e) => setTemplateForm({ ...templateForm, description: e.target.value })}
                            placeholder="Mô tả ngắn về mẫu email này"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Tiêu đề email *
                        </label>
                        <input
                            type="text"
                            value={templateForm.subject}
                            onChange={(e) => setTemplateForm({ ...templateForm, subject: e.target.value })}
                            placeholder="Tiêu đề email"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">
                            Nội dung email * (HTML)
                        </label>
                        <textarea
                            value={templateForm.content}
                            onChange={(e) => setTemplateForm({ ...templateForm, content: e.target.value })}
                            placeholder="Nội dung email (hỗ trợ HTML)..."
                            rows="10"
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg font-mono text-sm"
                        />
                        <p className="text-xs text-gray-500 mt-1">
                            Sử dụng {`{{customerName}}`} để hiển thị tên khách hàng
                        </p>
                    </div>

                    <div className="flex justify-end space-x-3 pt-4">
                        <button
                            onClick={() => setShowTemplateModal(false)}
                            className="px-4 py-2 border border-gray-300 rounded-lg text-gray-700 hover:bg-gray-50"
                        >
                            Hủy
                        </button>
                        <button
                            onClick={handleSaveTemplate}
                            className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
                        >
                            {editingTemplate ? 'Cập nhật' : 'Tạo mẫu'}
                        </button>
                    </div>
                </div>
            </Modal>
        </div>
    );
};

export default EmailManagementPage;
