import React from 'react';
import GuidePage from './GuidePage';

const ReturnPolicyPage = () => {
  const breadcrumbs = [
    { label: 'Chính sách đổi trả & bảo hành' }
  ];

  return (
    <GuidePage 
      title="CHÍNH SÁCH ĐỔI TRẢ & BẢO HÀNH" 
      breadcrumbs={breadcrumbs}
    >
      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">🔄 Chính sách đổi trả</h2>
          <div className="space-y-6">
            <div className="bg-green-50 p-6 rounded-lg border-l-4 border-green-500">
              <h3 className="font-semibold text-green-800 mb-4 text-lg">✅ Điều kiện đổi trả</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Sản phẩm còn nguyên vẹn, chưa sử dụng</li>
                <li>• Còn đầy đủ hóa đơn, phiếu bảo hành</li>
                <li>• Còn nguyên tem mác, bao bì gốc</li>
                <li>• Không có dấu hiệu hư hỏng do người dùng</li>
                <li>• Trong vòng 7 ngày kể từ ngày nhận hàng</li>
              </ul>
            </div>

            <div className="bg-blue-50 p-6 rounded-lg border-l-4 border-blue-500">
              <h3 className="font-semibold text-blue-800 mb-4 text-lg">❌ Trường hợp không được đổi trả</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Sản phẩm đã qua sử dụng</li>
                <li>• Hư hỏng do tác động bên ngoài</li>
                <li>• Mất hóa đơn, phiếu bảo hành</li>
                <li>• Sản phẩm đã được tùy chỉnh theo yêu cầu</li>
                <li>• Quá thời hạn 7 ngày</li>
              </ul>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">🔧 Chính sách bảo hành</h2>
          <div className="space-y-6">
            <div className="bg-amber-50 p-6 rounded-lg">
              <h3 className="font-semibold text-amber-800 mb-4 text-lg">⏰ Thời gian bảo hành</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-800 mb-2">Sản phẩm nội thất gỗ:</h4>
                  <ul className="space-y-1 text-gray-700 text-sm">
                    <li>• Tủ quần áo: 24 tháng</li>
                    <li>• Bàn trang điểm: 18 tháng</li>
                    <li>• Kệ sách: 12 tháng</li>
                    <li>• Giường ngủ: 24 tháng</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-gray-800 mb-2">Sản phẩm sofa:</h4>
                  <ul className="space-y-1 text-gray-700 text-sm">
                    <li>• Sofa vải: 12 tháng</li>
                    <li>• Sofa da: 18 tháng</li>
                    <li>• Sofa gỗ: 24 tháng</li>
                    <li>• Đệm sofa: 6 tháng</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-purple-50 p-6 rounded-lg">
              <h3 className="font-semibold text-purple-800 mb-4 text-lg">🛠️ Phạm vi bảo hành</h3>
              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <h4 className="font-medium text-gray-800 mb-2">Được bảo hành:</h4>
                  <ul className="space-y-1 text-gray-700 text-sm">
                    <li>• Lỗi sản xuất</li>
                    <li>• Hư hỏng tự nhiên</li>
                    <li>• Lỗi vật liệu</li>
                    <li>• Hư hỏng do vận chuyển</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-gray-800 mb-2">Không bảo hành:</h4>
                  <ul className="space-y-1 text-gray-700 text-sm">
                    <li>• Hư hỏng do sử dụng sai</li>
                    <li>• Tác động bên ngoài</li>
                    <li>• Tự ý sửa chữa</li>
                    <li>• Hư hỏng do thiên tai</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">📋 Quy trình đổi trả</h2>
          <div className="space-y-4">
            <div className="flex items-start space-x-4 p-4 bg-blue-50 rounded-lg">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">1</div>
              <div>
                <h3 className="font-semibold text-gray-800">Liên hệ hỗ trợ</h3>
                <p className="text-gray-600">Gọi hotline +84 876 807 798 hoặc email nghoangtanphat2709@gmail.com</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4 p-4 bg-blue-50 rounded-lg">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">2</div>
              <div>
                <h3 className="font-semibold text-gray-800">Cung cấp thông tin</h3>
                <p className="text-gray-600">Cung cấp mã đơn hàng, hình ảnh sản phẩm và lý do đổi trả</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4 p-4 bg-blue-50 rounded-lg">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">3</div>
              <div>
                <h3 className="font-semibold text-gray-800">Xác nhận yêu cầu</h3>
                <p className="text-gray-600">Chúng tôi sẽ xác nhận và hướng dẫn các bước tiếp theo</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4 p-4 bg-blue-50 rounded-lg">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">4</div>
              <div>
                <h3 className="font-semibold text-gray-800">Thu hồi sản phẩm</h3>
                <p className="text-gray-600">Nhân viên sẽ đến thu hồi sản phẩm (miễn phí trong nội thành)</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4 p-4 bg-blue-50 rounded-lg">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">5</div>
              <div>
                <h3 className="font-semibold text-gray-800">Xử lý yêu cầu</h3>
                <p className="text-gray-600">Kiểm tra và xử lý yêu cầu trong 3-5 ngày làm việc</p>
              </div>
            </div>
            
            <div className="flex items-start space-x-4 p-4 bg-blue-50 rounded-lg">
              <div className="flex-shrink-0 w-8 h-8 bg-blue-500 text-white rounded-full flex items-center justify-center font-bold">6</div>
              <div>
                <h3 className="font-semibold text-gray-800">Hoàn tất</h3>
                <p className="text-gray-600">Hoàn tiền hoặc đổi sản phẩm mới theo yêu cầu</p>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">💰 Phí đổi trả</h2>
          <div className="bg-gray-50 p-6 rounded-lg">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-800 mb-4">Miễn phí đổi trả</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Lỗi sản xuất từ phía SHOPNK</li>
                  <li>• Sản phẩm không đúng mô tả</li>
                  <li>• Hư hỏng trong quá trình vận chuyển</li>
                  <li>• Trong nội thành TP.HCM, Hà Nội</li>
                </ul>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-4">Có phí đổi trả</h3>
                <ul className="space-y-2 text-gray-700">
                  <li>• Đổi trả do thay đổi ý kiến: 50.000đ</li>
                  <li>• Ngoại thành: 100.000đ</li>
                  <li>• Các tỉnh thành khác: 150.000đ</li>
                  <li>• Đổi trả ngoài giờ: +50%</li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">⏰ Thời gian xử lý</h2>
          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-lg shadow">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Loại yêu cầu</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Thời gian xử lý</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ghi chú</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Đổi sản phẩm</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">3-5 ngày</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Có sẵn hàng</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Hoàn tiền</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">5-7 ngày</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Tùy phương thức thanh toán</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Bảo hành</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">7-14 ngày</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Tùy mức độ hư hỏng</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Sửa chữa</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">14-21 ngày</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Cần đặt lịch hẹn</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">📞 Liên hệ hỗ trợ</h2>
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

export default ReturnPolicyPage;

