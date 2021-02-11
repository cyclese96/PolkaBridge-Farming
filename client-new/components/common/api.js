import axios from 'axios';

export default axios.create({
  baseURL: `https://localhost:44341/`
});

// usage
// api.post(`users/${this.state.id}`)
//   .then(res => {
//     console.log(res);
//     res = {
//       // Dữ liệu cần lấy từ máy chủ
//       data: {},
//       // Mã trạng thái HTTP của yêu cầu
//       status: 200,
//       // Mô tả trạng thái tương ứng với mã trạng thái ở trên
//       statusText: 'OK',
//       // Thông tin header của hồi đáp (response)
//       headers: {},
//       // config được thiết lập trước khi gửi request
//       config: {},
//       // là thực thể của ClientRequest nếu sử dụng Node.js và XMLHttpRequest trong trình duyệt
//       request: {}
//     }
//   })