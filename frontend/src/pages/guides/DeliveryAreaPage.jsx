import React from 'react';
import GuidePage from './GuidePage';

const DeliveryAreaPage = () => {
  const breadcrumbs = [
    { label: 'Khu vực giao hàng & lắp đặt' }
  ];

  return (
    <GuidePage 
      title="KHU VỰC GIAO HÀNG & LẮP ĐẶT" 
      breadcrumbs={breadcrumbs}
    >
      <div className="space-y-8">
        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">🚚 Khu vực giao hàng</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div className="bg-green-50 p-6 rounded-lg">
              <h3 className="font-semibold text-green-800 mb-4 text-lg">Miễn phí giao hàng</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• TP. Hồ Chí Minh (tất cả quận/huyện)</li>
                <li>• Hà Nội (nội thành)</li>
                <li>• Đà Nẵng (nội thành)</li>
                <li>• Cần Thơ (nội thành)</li>
                <li>• Đơn hàng từ 2.000.000đ trở lên</li>
              </ul>
            </div>
            
            <div className="bg-amber-50 p-6 rounded-lg">
              <h3 className="font-semibold text-amber-800 mb-4 text-lg">Phí giao hàng</h3>
              <ul className="space-y-2 text-gray-700">
                <li>• Các tỉnh thành khác: 150.000đ</li>
                <li>• Vùng sâu vùng xa: 200.000đ</li>
                <li>• Đơn hàng dưới 2.000.000đ: 50.000đ</li>
                <li>• Giao hàng nhanh (24h): +100.000đ</li>
              </ul>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">🔧 Dịch vụ lắp đặt</h2>
          <div className="space-y-6">
            <div className="bg-blue-50 p-6 rounded-lg">
              <h3 className="font-semibold text-blue-800 mb-4 text-lg">Miễn phí lắp đặt</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-gray-800 mb-2">Sản phẩm được lắp đặt miễn phí:</h4>
                  <ul className="space-y-1 text-gray-700 text-sm">
                    <li>• Tủ quần áo</li>
                    <li>• Bàn trang điểm</li>
                    <li>• Kệ sách</li>
                    <li>• Tủ bếp</li>
                    <li>• Giường ngủ (có khung)</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-gray-800 mb-2">Khu vực lắp đặt miễn phí:</h4>
                  <ul className="space-y-1 text-gray-700 text-sm">
                    <li>• TP. Hồ Chí Minh</li>
                    <li>• Hà Nội</li>
                    <li>• Đà Nẵng</li>
                    <li>• Cần Thơ</li>
                  </ul>
                </div>
              </div>
            </div>

            <div className="bg-orange-50 p-6 rounded-lg">
              <h3 className="font-semibold text-orange-800 mb-4 text-lg">Phí lắp đặt</h3>
              <div className="grid md:grid-cols-2 gap-4">
                <div>
                  <h4 className="font-medium text-gray-800 mb-2">Sản phẩm có phí lắp đặt:</h4>
                  <ul className="space-y-1 text-gray-700 text-sm">
                    <li>• Sofa: 200.000đ</li>
                    <li>• Bàn ăn: 150.000đ</li>
                    <li>• Ghế: 100.000đ</li>
                    <li>• Tủ lạnh/TV: 300.000đ</li>
                  </ul>
                </div>
                <div>
                  <h4 className="font-medium text-gray-800 mb-2">Khu vực có phí lắp đặt:</h4>
                  <ul className="space-y-1 text-gray-700 text-sm">
                    <li>• Các tỉnh thành khác: 300.000đ</li>
                    <li>• Vùng sâu vùng xa: 500.000đ</li>
                    <li>• Lắp đặt ngoài giờ: +50%</li>
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">⏰ Thời gian giao hàng</h2>
          <div className="overflow-x-auto">
            <table className="w-full bg-white rounded-lg shadow">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Khu vực</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Thời gian giao hàng</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Thời gian lắp đặt</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-200">
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">TP. Hồ Chí Minh</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">1-2 ngày</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Sau khi giao hàng</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Hà Nội</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2-3 ngày</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Sau khi giao hàng</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Đà Nẵng, Cần Thơ</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">3-4 ngày</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Sau khi giao hàng</td>
                </tr>
                <tr>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Các tỉnh khác</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">5-7 ngày</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Cần đặt lịch trước</td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        <section>
          <h2 className="text-2xl font-semibold text-gray-800 mb-4">📞 Liên hệ đặt lịch</h2>
          <div className="bg-gray-50 p-6 rounded-lg">
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Hotline đặt lịch</h3>
                <p className="text-amber-600 font-bold text-lg">+84 876 807 798</p>
                <p className="text-gray-600 text-sm">Thứ 2 - Chủ nhật: 8:00 - 22:00</p>
              </div>
              <div>
                <h3 className="font-semibold text-gray-800 mb-2">Email</h3>
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

export default DeliveryAreaPage;

