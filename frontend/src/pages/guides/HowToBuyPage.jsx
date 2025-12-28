import React from 'react';
import GuidePage from './GuidePage';

const HowToBuyPage = () => {
  const breadcrumbs = [
    { label: 'Hướng dẫn mua hàng' }
  ];

  return (
    <GuidePage 
      title="HƯỚNG DẪN MUA HÀNG" 
      breadcrumbs={breadcrumbs}
    >
      <div className="space-y-16">
        {/* Introduction */}
        <div className="text-center mb-16">
          <div className="inline-flex items-center justify-center w-24 h-24 bg-gradient-to-r from-amber-500 to-amber-600 rounded-full mb-8 shadow-lg">
            <svg className="w-12 h-12 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-6">Chào mừng đến với SHOPNK</h2>
          <p className="text-xl text-gray-600 max-w-4xl mx-auto leading-relaxed">
            Mua sắm nội thất tại SHOPNK trở nên dễ dàng và thuận tiện với hướng dẫn chi tiết từng bước. 
            Chúng tôi cam kết mang đến trải nghiệm mua sắm tốt nhất cho bạn.
          </p>
        </div>

        {/* Steps Section */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-6">📋 Các bước mua hàng tại SHOPNK</h2>
            <div className="w-32 h-1 bg-gradient-to-r from-amber-500 to-amber-600 rounded-full mx-auto"></div>
          </div>
          
          <div className="grid gap-8">
            <div className="group relative overflow-hidden bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100">
              <div className="absolute inset-0 bg-gradient-to-r from-amber-500/5 to-orange-500/5"></div>
              <div className="relative p-8">
                <div className="flex items-start space-x-6">
                  <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-r from-amber-500 to-amber-600 text-white rounded-2xl flex items-center justify-center font-bold text-xl group-hover:scale-110 transition-transform duration-300 shadow-lg">1</div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-800 mb-4">Tìm kiếm sản phẩm</h3>
                    <p className="text-gray-600 leading-relaxed mb-6 text-lg">
                      Duyệt qua danh mục sản phẩm hoặc sử dụng thanh tìm kiếm để tìm sản phẩm phù hợp với nhu cầu của bạn.
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <span className="px-4 py-2 bg-amber-100 text-amber-800 rounded-full text-sm font-semibold border border-amber-200">Danh mục</span>
                      <span className="px-4 py-2 bg-amber-100 text-amber-800 rounded-full text-sm font-semibold border border-amber-200">Tìm kiếm</span>
                      <span className="px-4 py-2 bg-amber-100 text-amber-800 rounded-full text-sm font-semibold border border-amber-200">Lọc sản phẩm</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="group relative overflow-hidden bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-indigo-500/5"></div>
              <div className="relative p-8">
                <div className="flex items-start space-x-6">
                  <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-r from-blue-500 to-blue-600 text-white rounded-2xl flex items-center justify-center font-bold text-xl group-hover:scale-110 transition-transform duration-300 shadow-lg">2</div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-800 mb-4">Xem chi tiết sản phẩm</h3>
                    <p className="text-gray-600 leading-relaxed mb-6 text-lg">
                      Click vào sản phẩm để xem thông tin chi tiết, hình ảnh, kích thước, chất liệu và giá cả.
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <span className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold border border-blue-200">Hình ảnh</span>
                      <span className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold border border-blue-200">Thông số</span>
                      <span className="px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-semibold border border-blue-200">Giá cả</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="group relative overflow-hidden bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100">
              <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 to-emerald-500/5"></div>
              <div className="relative p-8">
                <div className="flex items-start space-x-6">
                  <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-r from-green-500 to-green-600 text-white rounded-2xl flex items-center justify-center font-bold text-xl group-hover:scale-110 transition-transform duration-300 shadow-lg">3</div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-800 mb-4">Thêm vào giỏ hàng</h3>
                    <p className="text-gray-600 leading-relaxed mb-6 text-lg">
                      Chọn số lượng và click "Thêm vào giỏ hàng" để đưa sản phẩm vào giỏ hàng của bạn.
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <span className="px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-semibold border border-green-200">Số lượng</span>
                      <span className="px-4 py-2 bg-green-100 text-green-800 rounded-full text-sm font-semibold border border-green-200">Giỏ hàng</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="group relative overflow-hidden bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100">
              <div className="absolute inset-0 bg-gradient-to-r from-purple-500/5 to-violet-500/5"></div>
              <div className="relative p-8">
                <div className="flex items-start space-x-6">
                  <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-r from-purple-500 to-purple-600 text-white rounded-2xl flex items-center justify-center font-bold text-xl group-hover:scale-110 transition-transform duration-300 shadow-lg">4</div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-800 mb-4">Kiểm tra giỏ hàng</h3>
                    <p className="text-gray-600 leading-relaxed mb-6 text-lg">
                      Xem lại các sản phẩm đã chọn, điều chỉnh số lượng nếu cần và click "Thanh toán".
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <span className="px-4 py-2 bg-purple-100 text-purple-800 rounded-full text-sm font-semibold border border-purple-200">Kiểm tra</span>
                      <span className="px-4 py-2 bg-purple-100 text-purple-800 rounded-full text-sm font-semibold border border-purple-200">Điều chỉnh</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="group relative overflow-hidden bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100">
              <div className="absolute inset-0 bg-gradient-to-r from-orange-500/5 to-red-500/5"></div>
              <div className="relative p-8">
                <div className="flex items-start space-x-6">
                  <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-r from-orange-500 to-orange-600 text-white rounded-2xl flex items-center justify-center font-bold text-xl group-hover:scale-110 transition-transform duration-300 shadow-lg">5</div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-800 mb-4">Đăng nhập/Đăng ký</h3>
                    <p className="text-gray-600 leading-relaxed mb-6 text-lg">
                      Đăng nhập tài khoản hoặc đăng ký tài khoản mới để tiếp tục thanh toán.
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <span className="px-4 py-2 bg-orange-100 text-orange-800 rounded-full text-sm font-semibold border border-orange-200">Đăng nhập</span>
                      <span className="px-4 py-2 bg-orange-100 text-orange-800 rounded-full text-sm font-semibold border border-orange-200">Đăng ký</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="group relative overflow-hidden bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100">
              <div className="absolute inset-0 bg-gradient-to-r from-teal-500/5 to-cyan-500/5"></div>
              <div className="relative p-8">
                <div className="flex items-start space-x-6">
                  <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-r from-teal-500 to-teal-600 text-white rounded-2xl flex items-center justify-center font-bold text-xl group-hover:scale-110 transition-transform duration-300 shadow-lg">6</div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-800 mb-4">Nhập thông tin giao hàng</h3>
                    <p className="text-gray-600 leading-relaxed mb-6 text-lg">
                      Điền đầy đủ thông tin địa chỉ giao hàng và thông tin liên hệ.
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <span className="px-4 py-2 bg-teal-100 text-teal-800 rounded-full text-sm font-semibold border border-teal-200">Địa chỉ</span>
                      <span className="px-4 py-2 bg-teal-100 text-teal-800 rounded-full text-sm font-semibold border border-teal-200">Liên hệ</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="group relative overflow-hidden bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100">
              <div className="absolute inset-0 bg-gradient-to-r from-pink-500/5 to-rose-500/5"></div>
              <div className="relative p-8">
                <div className="flex items-start space-x-6">
                  <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-r from-pink-500 to-pink-600 text-white rounded-2xl flex items-center justify-center font-bold text-xl group-hover:scale-110 transition-transform duration-300 shadow-lg">7</div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-800 mb-4">Chọn phương thức thanh toán</h3>
                    <p className="text-gray-600 leading-relaxed mb-6 text-lg">
                      Chọn phương thức thanh toán phù hợp: chuyển khoản, COD, hoặc thẻ tín dụng.
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <span className="px-4 py-2 bg-pink-100 text-pink-800 rounded-full text-sm font-semibold border border-pink-200">Chuyển khoản</span>
                      <span className="px-4 py-2 bg-pink-100 text-pink-800 rounded-full text-sm font-semibold border border-pink-200">COD</span>
                      <span className="px-4 py-2 bg-pink-100 text-pink-800 rounded-full text-sm font-semibold border border-pink-200">Thẻ tín dụng</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
            
            <div className="group relative overflow-hidden bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100">
              <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/5 to-blue-500/5"></div>
              <div className="relative p-8">
                <div className="flex items-start space-x-6">
                  <div className="flex-shrink-0 w-16 h-16 bg-gradient-to-r from-indigo-500 to-indigo-600 text-white rounded-2xl flex items-center justify-center font-bold text-xl group-hover:scale-110 transition-transform duration-300 shadow-lg">8</div>
                  <div className="flex-1">
                    <h3 className="text-2xl font-bold text-gray-800 mb-4">Xác nhận đơn hàng</h3>
                    <p className="text-gray-600 leading-relaxed mb-6 text-lg">
                      Kiểm tra lại toàn bộ thông tin và xác nhận đặt hàng.
                    </p>
                    <div className="flex flex-wrap gap-3">
                      <span className="px-4 py-2 bg-indigo-100 text-indigo-800 rounded-full text-sm font-semibold border border-indigo-200">Kiểm tra</span>
                      <span className="px-4 py-2 bg-indigo-100 text-indigo-800 rounded-full text-sm font-semibold border border-indigo-200">Xác nhận</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Important Notes */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-6">💡 Lưu ý quan trọng</h2>
            <div className="w-32 h-1 bg-gradient-to-r from-amber-500 to-amber-600 rounded-full mx-auto"></div>
          </div>
          
          <div className="grid md:grid-cols-2 gap-8">
            <div className="group relative overflow-hidden bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-indigo-500/5"></div>
              <div className="relative p-8">
                <div className="flex items-center mb-6">
                  <div className="w-14 h-14 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mr-4 shadow-lg">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800">Thông tin sản phẩm</h3>
                </div>
                <ul className="space-y-4 text-gray-700">
                  <li className="flex items-start text-lg">
                    <span className="w-3 h-3 bg-blue-500 rounded-full mt-2 mr-4 flex-shrink-0"></span>
                    Kiểm tra kỹ thông tin sản phẩm trước khi đặt hàng
                  </li>
                  <li className="flex items-start text-lg">
                    <span className="w-3 h-3 bg-blue-500 rounded-full mt-2 mr-4 flex-shrink-0"></span>
                    Đảm bảo địa chỉ giao hàng chính xác và đầy đủ
                  </li>
                  <li className="flex items-start text-lg">
                    <span className="w-3 h-3 bg-blue-500 rounded-full mt-2 mr-4 flex-shrink-0"></span>
                    Thời gian xử lý đơn hàng: 1-2 ngày làm việc
                  </li>
                </ul>
              </div>
            </div>

            <div className="group relative overflow-hidden bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100">
              <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 to-emerald-500/5"></div>
              <div className="relative p-8">
                <div className="flex items-center mb-6">
                  <div className="w-14 h-14 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl flex items-center justify-center mr-4 shadow-lg">
                    <svg className="w-7 h-7 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1" />
                    </svg>
                  </div>
                  <h3 className="text-2xl font-bold text-gray-800">Ưu đãi đặc biệt</h3>
                </div>
                <ul className="space-y-4 text-gray-700">
                  <li className="flex items-start text-lg">
                    <span className="w-3 h-3 bg-green-500 rounded-full mt-2 mr-4 flex-shrink-0"></span>
                    Miễn phí giao hàng cho đơn hàng từ 2 triệu đồng
                  </li>
                  <li className="flex items-start text-lg">
                    <span className="w-3 h-3 bg-green-500 rounded-full mt-2 mr-4 flex-shrink-0"></span>
                    Hỗ trợ lắp đặt miễn phí tại TP.HCM và Hà Nội
                  </li>
                  <li className="flex items-start text-lg">
                    <span className="w-3 h-3 bg-green-500 rounded-full mt-2 mr-4 flex-shrink-0"></span>
                    Bảo hành chính hãng lên đến 24 tháng
                  </li>
                </ul>
              </div>
            </div>
          </div>
        </section>

        {/* Support Section */}
        <section className="mb-20">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-6">📞 Hỗ trợ khách hàng</h2>
            <div className="w-32 h-1 bg-gradient-to-r from-amber-500 to-amber-600 rounded-full mx-auto"></div>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            <div className="group relative overflow-hidden bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 text-center">
              <div className="absolute inset-0 bg-gradient-to-r from-amber-500/5 to-orange-500/5"></div>
              <div className="relative p-8">
                <div className="w-20 h-20 bg-gradient-to-r from-amber-500 to-amber-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Hotline</h3>
                <p className="text-amber-600 font-bold text-3xl mb-4">+84 876 807 798</p>
                <p className="text-gray-600 text-lg">Thứ 2 - Chủ nhật: 8:00 - 22:00</p>
              </div>
            </div>

            <div className="group relative overflow-hidden bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 text-center">
              <div className="absolute inset-0 bg-gradient-to-r from-blue-500/5 to-indigo-500/5"></div>
              <div className="relative p-8">
                <div className="w-20 h-20 bg-gradient-to-r from-blue-500 to-blue-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Email</h3>
                <p className="text-blue-600 font-bold text-xl mb-4 break-all">nghoangtanphat2709@gmail.com</p>
                <p className="text-gray-600 text-lg">Phản hồi trong 24h</p>
              </div>
            </div>

            <div className="group relative overflow-hidden bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 border border-gray-100 text-center">
              <div className="absolute inset-0 bg-gradient-to-r from-green-500/5 to-emerald-500/5"></div>
              <div className="relative p-8">
                <div className="w-20 h-20 bg-gradient-to-r from-green-500 to-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6 shadow-lg group-hover:scale-110 transition-transform duration-300">
                  <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                  </svg>
                </div>
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Chat trực tuyến</h3>
                <p className="text-green-600 font-bold text-3xl mb-4">24/7</p>
                <p className="text-gray-600 text-lg">Hỗ trợ tức thì</p>
              </div>
            </div>
          </div>
        </section>
      </div>
    </GuidePage>
  );
};

export default HowToBuyPage;

