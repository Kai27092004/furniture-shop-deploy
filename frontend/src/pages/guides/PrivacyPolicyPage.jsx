import React from 'react';
import GuidePage from './GuidePage';

const PrivacyPolicyPage = () => {
  const breadcrumbs = [
    { label: 'Chính sách bảo mật thông tin' }
  ];

  return (
    <GuidePage 
      title="CHÍNH SÁCH BẢO MẬT THÔNG TIN" 
      breadcrumbs={breadcrumbs}
    >
      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">🔒 Cam kết bảo mật</h2>
          <div className="bg-blue-50 p-6 rounded-lg">
            <p className="text-gray-700 leading-relaxed">
              SHOPNK cam kết bảo vệ thông tin cá nhân của khách hàng theo tiêu chuẩn quốc tế. 
              Chúng tôi sử dụng các biện pháp bảo mật tiên tiến để đảm bảo thông tin của bạn 
              được bảo vệ an toàn và không bị lạm dụng.
            </p>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">📋 Thông tin chúng tôi thu thập</h2>
          <div className="space-y-6">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="font-semibold text-gray-800 mb-4 text-lg">Thông tin cá nhân</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Họ tên, địa chỉ email, số điện thoại</li>
                <li>• Địa chỉ giao hàng và thanh toán</li>
                <li>• Thông tin tài khoản ngân hàng (nếu có)</li>
                <li>• Ngày sinh, giới tính (tùy chọn)</li>
                <li>• Sở thích mua sắm và lịch sử giao dịch</li>
              </ul>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="font-semibold text-gray-800 mb-4 text-lg">Thông tin kỹ thuật</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Địa chỉ IP và thông tin trình duyệt</li>
                <li>• Dữ liệu cookie và session</li>
                <li>• Thông tin thiết bị và hệ điều hành</li>
                <li>• Dữ liệu phân tích website (Google Analytics)</li>
                <li>• Thông tin vị trí địa lý (nếu cho phép)</li>
              </ul>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">🎯 Mục đích sử dụng thông tin</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-green-50 p-6 rounded-lg">
              <h3 className="font-semibold text-green-800 mb-4 text-lg">Dịch vụ khách hàng</h3>
              <ul className="space-y-2 text-gray-700 text-sm">
                <li>• Xử lý đơn hàng và giao hàng</li>
                <li>• Hỗ trợ khách hàng</li>
                <li>• Xác thực danh tính</li>
                <li>• Gửi thông báo quan trọng</li>
                <li>• Cải thiện chất lượng dịch vụ</li>
              </ul>
            </div>

            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="font-semibold text-blue-800 mb-4 text-lg">Marketing & Quảng cáo</h3>
              <ul className="space-y-2 text-gray-700 text-sm">
                <li>• Gửi email marketing</li>
                <li>• Hiển thị quảng cáo phù hợp</li>
                <li>• Khuyến mãi đặc biệt</li>
                <li>• Khảo sát khách hàng</li>
                <li>• Phân tích xu hướng mua sắm</li>
              </ul>
            </div>

            <div className="bg-purple-50 p-6 rounded-lg">
              <h3 className="font-semibold text-purple-800 mb-4 text-lg">Bảo mật & Pháp lý</h3>
              <ul className="space-y-2 text-gray-700 text-sm">
                <li>• Ngăn chặn gian lận</li>
                <li>• Tuân thủ pháp luật</li>
                <li>• Bảo vệ quyền lợi khách hàng</li>
                <li>• Xử lý tranh chấp</li>
                <li>• Kiểm toán nội bộ</li>
              </ul>
            </div>

            <div className="bg-orange-50 p-6 rounded-lg">
              <h3 className="font-semibold text-orange-800 mb-4 text-lg">Cải thiện Website</h3>
              <ul className="space-y-2 text-gray-700 text-sm">
                <li>• Phân tích hiệu suất website</li>
                <li>• Tối ưu trải nghiệm người dùng</li>
                <li>• Phát triển tính năng mới</li>
                <li>• Khắc phục lỗi kỹ thuật</li>
                <li>• Nghiên cứu thị trường</li>
              </ul>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">🔐 Biện pháp bảo mật</h2>
          <div className="space-y-6">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="font-semibold text-gray-800 mb-4 text-lg">Mã hóa dữ liệu</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-800 mb-2">Mã hóa SSL/TLS</h4>
                  <p className="text-gray-600 text-sm">Tất cả dữ liệu truyền tải được mã hóa bằng giao thức SSL 256-bit</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-800 mb-2">Mã hóa cơ sở dữ liệu</h4>
                  <p className="text-gray-600 text-sm">Dữ liệu nhạy cảm được mã hóa AES-256 trong cơ sở dữ liệu</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="font-semibold text-gray-800 mb-4 text-lg">Kiểm soát truy cập</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-800 mb-2">Xác thực 2 lớp</h4>
                  <p className="text-gray-600 text-sm">Bảo vệ tài khoản bằng mã OTP qua SMS/Email</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-800 mb-2">Phân quyền nghiêm ngặt</h4>
                  <p className="text-gray-600 text-sm">Chỉ nhân viên được ủy quyền mới có thể truy cập dữ liệu</p>
                </div>
              </div>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg">
              <h3 className="font-semibold text-gray-800 mb-4 text-lg">Giám sát & Kiểm tra</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-800 mb-2">Giám sát 24/7</h4>
                  <p className="text-gray-600 text-sm">Hệ thống giám sát tự động phát hiện hoạt động bất thường</p>
                </div>
                <div>
                  <h4 className="font-medium text-gray-800 mb-2">Kiểm tra định kỳ</h4>
                  <p className="text-gray-600 text-sm">Kiểm tra bảo mật hàng quý bởi chuyên gia độc lập</p>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">🤝 Chia sẻ thông tin</h2>
          <div className="space-y-4">
            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="font-semibold text-gray-800 mb-4">Chúng tôi KHÔNG bán thông tin cá nhân</h3>
              <p className="text-gray-700 mb-4">
                SHOPNK cam kết không bán, cho thuê hoặc trao đổi thông tin cá nhân của khách hàng 
                cho bên thứ ba vì mục đích thương mại.
              </p>
            </div>

            <div className="bg-white p-6 rounded-lg shadow">
              <h3 className="font-semibold text-gray-800 mb-4">Chia sẻ có điều kiện</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• <strong>Đối tác vận chuyển:</strong> Chỉ thông tin cần thiết để giao hàng</li>
                <li>• <strong>Đối tác thanh toán:</strong> Thông tin giao dịch để xử lý thanh toán</li>
                <li>• <strong>Cơ quan pháp luật:</strong> Khi có yêu cầu chính thức từ cơ quan có thẩm quyền</li>
                <li>• <strong>Bảo vệ quyền lợi:</strong> Khi cần thiết để bảo vệ quyền lợi hợp pháp của SHOPNK</li>
              </ul>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">👤 Quyền của khách hàng</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-green-50 p-6 rounded-lg">
              <h3 className="font-semibold text-green-800 mb-4 text-lg">Quyền truy cập</h3>
              <ul className="space-y-2 text-gray-700 text-sm">
                <li>• Xem thông tin cá nhân đã lưu trữ</li>
                <li>• Tải xuống dữ liệu cá nhân</li>
                <li>• Kiểm tra lịch sử giao dịch</li>
                <li>• Xem nhật ký hoạt động tài khoản</li>
              </ul>
            </div>

            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="font-semibold text-blue-800 mb-4 text-lg">Quyền chỉnh sửa</h3>
              <ul className="space-y-2 text-gray-700 text-sm">
                <li>• Cập nhật thông tin cá nhân</li>
                <li>• Thay đổi mật khẩu</li>
                <li>• Cập nhật sở thích</li>
                <li>• Chỉnh sửa địa chỉ giao hàng</li>
              </ul>
            </div>

            <div className="bg-purple-50 p-6 rounded-lg">
              <h3 className="font-semibold text-purple-800 mb-4 text-lg">Quyền xóa bỏ</h3>
              <ul className="space-y-2 text-gray-700 text-sm">
                <li>• Xóa tài khoản cá nhân</li>
                <li>• Xóa dữ liệu không cần thiết</li>
                <li>• Hủy đăng ký nhận tin</li>
                <li>• Xóa lịch sử tìm kiếm</li>
              </ul>
            </div>

            <div className="bg-orange-50 p-6 rounded-lg">
              <h3 className="font-semibold text-orange-800 mb-4 text-lg">Quyền từ chối</h3>
              <ul className="space-y-2 text-gray-700 text-sm">
                <li>• Từ chối nhận email marketing</li>
                <li>• Từ chối chia sẻ thông tin</li>
                <li>• Từ chối cookie không cần thiết</li>
                <li>• Từ chối theo dõi quảng cáo</li>
              </ul>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">🍪 Chính sách Cookie</h2>
          <div className="bg-gray-50 p-6 rounded-lg">
            <div className="space-y-4">
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Cookie cần thiết</h3>
                <p className="text-gray-600 text-sm">
                  Các cookie này cần thiết để website hoạt động bình thường, không thể tắt được.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Cookie phân tích</h3>
                <p className="text-gray-600 text-sm">
                  Giúp chúng tôi hiểu cách khách hàng sử dụng website để cải thiện trải nghiệm.
                </p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Cookie marketing</h3>
                <p className="text-gray-600 text-sm">
                  Được sử dụng để hiển thị quảng cáo phù hợp và đo lường hiệu quả chiến dịch.
                </p>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">📞 Liên hệ về bảo mật</h2>
          <div className="bg-amber-50 p-6 rounded-lg">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Bộ phận bảo mật</h3>
                <p className="text-amber-600 font-bold text-lg">nghoangtanphat2709@gmail.com</p>
                <p className="text-gray-600 text-sm">Phản hồi trong 24h</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Hotline hỗ trợ</h3>
                <p className="text-amber-600 font-bold text-lg">+84 876 807 798</p>
                <p className="text-gray-600 text-sm">Thứ 2 - Chủ nhật: 8:00 - 22:00</p>
              </div>
            </div>
            <div className="mt-4 p-4 bg-white rounded-lg">
              <p className="text-gray-700 text-sm">
                <strong>Lưu ý:</strong> Chính sách này có thể được cập nhật định kỳ. 
                Chúng tôi sẽ thông báo qua email hoặc thông báo trên website khi có thay đổi quan trọng.
              </p>
            </div>
          </div>
        </section>
      </div>
    </GuidePage>
  );
};

export default PrivacyPolicyPage;

