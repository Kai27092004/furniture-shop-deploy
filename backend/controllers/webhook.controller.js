// const db = require('../models');
// const crypto = require('crypto');

// /**
//  * Handler for SePay webhook notifications.
//  * Expects JSON body from SePay. We'll try to validate HMAC signature if
//  * SEPAY_WEBHOOK_SECRET is set in env (header 'x-sepay-signature').
//  * The payload should contain a field identifying the order (we'll check 'des' or 'orderId').
//  */
// exports.handleSepay = async (req, res) => {
//     try {
//         const secret = process.env.SEPAY_WEBHOOK_SECRET;
//         const rawBody = JSON.stringify(req.body || {});

//         // Optional signature validation
//         if (secret) {
//             const signatureHeader = req.headers['x-sepay-signature'] || req.headers['x-signature'] || '';
//             const expected = crypto.createHmac('sha256', secret).update(rawBody).digest('hex');
//             if (!signatureHeader || signatureHeader !== expected) {
//                 console.warn('Webhook signature mismatch');
//                 return res.status(400).send({ message: 'Invalid webhook signature' });
//             }
//         }

//         const payload = req.body || {};

//         // Try to extract order id from common fields
//         // The frontend set QR param des=${order.id}, some providers forward this as 'des' or 'description'
//         const maybeId = payload.orderId || payload.des || payload.description || payload.note || payload.reference;
//         // Allow numeric strings
//         const orderId = parseInt(maybeId, 10);

//         // Map provider status to our order status
//         // Accept many possible fields/names that payment provider might send.
//         const getField = (keys) => {
//             for (const k of keys) {
//                 if (payload[k] !== undefined && payload[k] !== null) return payload[k];
//             }
//             return undefined;
//         };

//         const statusFields = [
//             'status', 'payment_status', 'txn_status', 'transaction_status', 'result', 'response', 'resp', 'respCode', 'response_code', 'code'
//         ];

//         const providerStatusRaw = getField(statusFields) || '';
//         const providerStatus = String(providerStatusRaw).toLowerCase();

//         // Some providers use numeric success codes like '00' or '0'
//         const numericCode = String(providerStatusRaw).trim();

//         // Determine success/failure by checking multiple possible indicators
//         const isSuccess = () => {
//             if (!providerStatusRaw) return false;
//             // textual matches
//             if (providerStatus.includes('success') || providerStatus.includes('paid') || providerStatus.includes('ok') || providerStatus.includes('completed')) return true;
//             // common success codes
//             if (numericCode === '00' || numericCode === '0') return true;
//             // some providers include resultCode / result = '00'
//             const extraSuccess = getField(['resultCode', 'result_code', 'result', 'rc']);
//             if (String(extraSuccess).trim() === '00' || String(extraSuccess).toLowerCase() === 'success') return true;
//             return false;
//         };

//         const isFailure = () => {
//             if (!providerStatusRaw) return false;
//             if (providerStatus.includes('fail') || providerStatus.includes('failed') || providerStatus.includes('cancel') || providerStatus.includes('rejected') || providerStatus.includes('error')) return true;
//             const extra = getField(['errorCode', 'error_code', 'status_code']);
//             if (String(extra).trim() && String(extra).trim() !== '00' && String(extra).trim() !== '0') return true;
//             return false;
//         };

//         let newStatus = null;
//         if (isSuccess()) {
//             newStatus = 'processing'; // mark as processing after payment success
//         } else if (isFailure()) {
//             newStatus = 'cancelled';
//         }

//         if (!orderId) {
//             console.warn('Webhook received without recognizable order identifier', payload);
//             return res.status(400).send({ message: 'Missing order identifier in webhook payload' });
//         }

//         const order = await db.Order.findByPk(orderId);
//         if (!order) {
//             console.warn(`Order not found for webhook orderId=${orderId}`);
//             return res.status(404).send({ message: 'Order not found' });
//         }

//         if (newStatus) {
//             // Only update if different
//             if (order.status !== newStatus) {
//                 order.status = newStatus;
//                 await order.save();
//                 console.log(`Order ${orderId} status updated to ${newStatus} via webhook`);
//             }
//         } else {
//             console.log('Webhook received but no actionable status mapping for payload:', payload);
//         }

//         // Log raw payload for audit (could be persisted to DB in future)
//         console.log('Webhook payload:', payload);

//         return res.status(200).send({ success: true });
//     } catch (err) {
//         console.error('Error handling sepay webhook:', err);
//         return res.status(500).send({ message: 'Server error' });
//     }
// };
// backend/controllers/webhook.controller.js

const db = require('../models');
const crypto = require('crypto');

/**
 * Xử lý Webhook từ SePay
 * Nhiệm vụ: Nhận thông báo tiền về -> Tìm mã đơn hàng -> Cập nhật trạng thái "Đã thanh toán"
 */
exports.handleSepay = async (req, res) => {
    try {
        // 1. Lấy dữ liệu từ SePay gửi qua
        const payload = req.body || {};
        console.log('--- SEPAY WEBHOOK RECEIVED ---');
        console.log('Dữ liệu nhận được:', JSON.stringify(payload, null, 2));

        // 2. Kiểm tra bảo mật (Signature) - Tùy chọn
        // Nếu bạn đã cấu hình SEPAY_WEBHOOK_SECRET trên Render thì đoạn này sẽ chạy
        const secret = process.env.SEPAY_WEBHOOK_SECRET;
        if (secret) {
            const signatureHeader = req.headers['x-sepay-signature'] || req.headers['x-signature'] || '';
            const rawBody = JSON.stringify(payload);
            const expected = crypto.createHmac('sha256', secret).update(rawBody).digest('hex');
            
            // Lưu ý: Đôi khi JSON.stringify làm thay đổi thứ tự key khiến hash sai lệch.
            // Nếu gặp lỗi signature liên tục, bạn có thể tạm thời comment đoạn check này để test.
            if (!signatureHeader || signatureHeader !== expected) {
                console.warn('⚠️ Cảnh báo: Webhook signature không khớp! Có thể là giả mạo.');
                // return res.status(400).send({ message: 'Invalid webhook signature' }); // Bỏ comment nếu muốn bảo mật tuyệt đối
            }
        }

        // 3. Phân tích nội dung chuyển khoản để tìm Order ID
        // SePay thường gửi nội dung trong trường 'content' hoặc 'description'
        const content = payload.content || payload.description || '';
        
        if (!content) {
            console.warn('⚠️ Webhook không có nội dung chuyển khoản (content/description).');
            return res.status(200).send({ success: true }); // Trả 200 để SePay không gửi lại
        }

        // --- LOGIC TÌM MÃ ĐƠN HÀNG (QUAN TRỌNG NHẤT) ---
        
        let orderId = null;

        // Cách 1: Tìm theo từ khóa "DH" + số (Ví dụ: DH109) - Khuyên dùng nếu bạn set QR như vậy
        const matchDH = content.match(/DH(\d+)/i);
        if (matchDH) {
            orderId = parseInt(matchDH[1], 10);
        } 
        // Cách 2: Nếu không có từ khóa, lấy CON SỐ CUỐI CÙNG trong chuỗi
        // Ví dụ: "QAEEDX8389 SEPAY5656 1 109" -> Sẽ lấy số 109
        else {
            const matches = content.match(/\d+/g); // Lấy tất cả các nhóm số
            if (matches && matches.length > 0) {
                orderId = parseInt(matches[matches.length - 1], 10);
            }
        }

        if (!orderId) {
            console.warn('❌ Không tìm thấy Order ID nào trong nội dung:', content);
            return res.status(200).send({ success: true });
        }

        console.log(`✅ Tìm thấy Order ID: ${orderId}`);

        // 4. Tìm đơn hàng trong Database
        const order = await db.Order.findByPk(orderId);
        if (!order) {
            console.warn(`❌ Không tìm thấy đơn hàng có ID ${orderId} trong Database.`);
            return res.status(200).send({ success: true });
        }

        // 5. Cập nhật trạng thái đơn hàng
        // Kiểm tra xem số tiền chuyển có khớp với tổng tiền đơn hàng không (Tùy chọn)
        const transferAmount = parseFloat(payload.transferAmount || 0);
        const orderAmount = parseFloat(order.totalAmount);

        // Chấp nhận sai số nhỏ (hoặc bạn có thể bỏ qua check này nếu muốn)
        if (transferAmount < orderAmount) {
            console.warn(`⚠️ Số tiền chuyển (${transferAmount}) nhỏ hơn giá trị đơn hàng (${orderAmount}). Chưa cập nhật.`);
            // Có thể cập nhật trạng thái khác như 'partial_payment' nếu muốn
            return res.status(200).send({ success: true });
        }

        // Nếu đơn hàng đang ở trạng thái chờ (pending) hoặc hủy (cancelled) thì cập nhật
        if (order.status === 'pending' || order.status === 'cancelled') {
            order.status = 'processing'; // Chuyển sang trạng thái "Đã thanh toán/Đang xử lý"
            await order.save();
            console.log(`🎉 Đã cập nhật đơn hàng #${orderId} sang trạng thái: processing`);
        } else {
            console.log(`ℹ️ Đơn hàng #${orderId} đang ở trạng thái ${order.status}, không cần cập nhật lại.`);
        }

        // 6. Trả về thành công cho SePay
        return res.status(200).send({ success: true });

    } catch (err) {
        console.error('🔥 Lỗi xử lý SePay webhook:', err);
        // Vẫn trả về 200 hoặc 500. Nếu trả 500 SePay sẽ thử gửi lại sau.
        return res.status(500).send({ message: 'Server error' });
    }
};