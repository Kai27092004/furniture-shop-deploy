import React from 'react';
import GuidePage from './GuidePage';

const PaymentMethodPage = () => {
  const breadcrumbs = [
    { label: 'Phương thức thanh toán' }
  ];

  return (
    <GuidePage 
      title="PHƯƠNG THỨC THANH TOÁN" 
      breadcrumbs={breadcrumbs}
    >
      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">💳 Các phương thức thanh toán</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-green-50 p-6 rounded-lg border-l-4 border-green-500">
              <h3 className="font-semibold text-green-800 mb-4 text-lg">💵 Thanh toán khi nhận hàng (COD)</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Thanh toán bằng tiền mặt khi nhận hàng</li>
                <li>• Kiểm tra hàng trước khi thanh toán</li>
                <li>• Phí COD: 20.000đ/đơn hàng</li>
                <li>• Áp dụng cho tất cả khu vực</li>
                <li>• Thời gian: 1-7 ngày tùy khu vực</li>
              </ul>
            </div>
            
            <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500">
              <h3 className="font-semibold text-blue-800 mb-4 text-lg">🏦 Chuyển khoản ngân hàng</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Chuyển khoản trước khi giao hàng</li>
                <li>• Miễn phí chuyển khoản</li>
                <li>• Xác nhận đơn hàng nhanh chóng</li>
                <li>• Hỗ trợ nhiều ngân hàng</li>
                <li>• Thời gian: 1-2 ngày</li>
              </ul>
            </div>
            
            <div className="bg-purple-50 p-6 rounded-lg border-l-4 border-purple-500">
              <h3 className="font-semibold text-purple-800 mb-4 text-lg">💳 Thẻ tín dụng/ghi nợ</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Visa, Mastercard, JCB</li>
                <li>• Thanh toán trực tuyến an toàn</li>
                <li>• Bảo mật thông tin cao</li>
                <li>• Xác nhận ngay lập tức</li>
                <li>• Thời gian: 1-2 ngày</li>
              </ul>
            </div>
            
            <div className="bg-orange-50 p-6 rounded-lg border-l-4 border-orange-500">
              <h3 className="font-semibold text-orange-800 mb-4 text-lg">📱 Ví điện tử</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• MoMo, ZaloPay, VNPay</li>
                <li>• Thanh toán nhanh chóng</li>
                <li>• Tích hợp QR Code</li>
                <li>• Khuyến mãi đặc biệt</li>
                <li>• Thời gian: 1-2 ngày</li>
              </ul>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">🏦 Thông tin chuyển khoản</h2>
          <div className="bg-gray-50 p-6 rounded-lg">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-800 mb-4">Ngân hàng Vietcombank</h3>
                <div className="space-y-2 text-gray-700">
                  <p><strong>Tên tài khoản:</strong> CÔNG TY TNHH SHOPNK</p>
                  <p><strong>Số tài khoản:</strong> 1234567890</p>
                  <p><strong>Chi nhánh:</strong> Hồ Chí Minh</p>
                </div>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-4">Ngân hàng BIDV</h3>
                <div className="space-y-2 text-gray-700">
                  <p><strong>Tên tài khoản:</strong> CÔNG TY TNHH SHOPNK</p>
                  <p><strong>Số tài khoản:</strong> 9876543210</p>
                  <p><strong>Chi nhánh:</strong> Hồ Chí Minh</p>
                </div>
              </div>
            </div>
            <div className="mt-4 p-4 bg-amber-50 rounded-lg">
              <p className="text-amber-800 font-medium">📝 Lưu ý khi chuyển khoản:</p>
              <ul className="mt-2 space-y-1 text-gray-700 text-sm">
                <li>• Nội dung chuyển khoản: "Tên + SĐT + Mã đơn hàng"</li>
                <li>• Gửi ảnh biên lai qua Zalo: +84 876 807 798</li>
                <li>• Hoặc email: nghoangtanphat2709@gmail.com</li>
                <li>• Chúng tôi sẽ xác nhận trong 30 phút</li>
              </ul>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">🔒 Bảo mật thanh toán</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center p-6 bg-white rounded-lg shadow">
              <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🔐</span>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Mã hóa SSL</h3>
              <p className="text-gray-600 text-sm">Tất cả thông tin thanh toán được mã hóa an toàn</p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-lg shadow">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🛡️</span>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">PCI DSS</h3>
              <p className="text-gray-600 text-sm">Tuân thủ tiêu chuẩn bảo mật quốc tế</p>
            </div>
            
            <div className="text-center p-6 bg-white rounded-lg shadow">
              <div className="w-16 h-16 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">✅</span>
              </div>
              <h3 className="font-semibold text-gray-800 mb-2">Xác thực 3D</h3>
              <p className="text-gray-600 text-sm">Xác thực 2 lớp cho giao dịch an toàn</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">❓ Câu hỏi thường gặp</h2>
          <div className="space-y-4">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="font-semibold text-gray-800 mb-2">Tôi có thể hủy đơn hàng sau khi thanh toán không?</h3>
              <p className="text-gray-600">Có, bạn có thể hủy đơn hàng trong vòng 24h sau khi đặt. Liên hệ hotline +84 876 807 798 để được hỗ trợ.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="font-semibold text-gray-800 mb-2">Thời gian hoàn tiền là bao lâu?</h3>
              <p className="text-gray-600">Thời gian hoàn tiền từ 3-7 ngày làm việc tùy thuộc vào phương thức thanh toán ban đầu.</p>
            </div>
            
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="font-semibold text-gray-800 mb-2">Tôi có thể đổi phương thức thanh toán không?</h3>
              <p className="text-gray-600">Có thể, nhưng chỉ trước khi đơn hàng được xác nhận. Liên hệ hotline để được hỗ trợ.</p>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">📞 Hỗ trợ thanh toán</h2>
          <div className="bg-amber-50 p-6 rounded-lg">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Hotline hỗ trợ</h3>
                <p className="text-amber-600 font-bold text-lg">+84 876 807 798</p>
                <p className="text-gray-600 text-sm">Thứ 2 - Chủ nhật: 8:00 - 22:00</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Email hỗ trợ</h3>
                <p className="text-amber-600 font-bold text-lg">nghoangtanphat2709@gmail.com</p>
                <p className="text-gray-600 text-sm">Phản hồi trong 2h</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </GuidePage>
  );
};

export default PaymentMethodPage;

