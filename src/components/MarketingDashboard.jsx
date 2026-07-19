import React, { useState, useEffect, useRef } from 'react';
import { 
  KPI_WEEKS, KPI_COLS, BRAND_HEALTH, 
  PILLARS_FULL, STORY, VCONCEPTS 
} from '../data/marketingData.js';
import { 
  Send, User, Calendar, Award, LineChart, 
  Trash2, Plus, RefreshCw, Eye, Grid 
} from 'lucide-react';

// Default posts list static backup
const DEFAULT_POSTS_STATIC = [
  {n:1,p:"P5",t:"Tôi là Hiệp — người kể chuyện vùng đất phía Đông Hà Nội",h:"3 năm trước tôi là dân nội đô thuần. Bây giờ tôi sống ở nơi Hà Nội đang trở thành…",f:"Post dài + 5 ảnh",d:"—",g:"20:00"},
  {n:2,p:"P1",t:"Phố Hiến — thương cảng vàng son chỉ sau Hội An mà ít người Hà Nội biết",h:"Tôi từng nghĩ Hưng Yên = quê. Cho đến ngày tôi đọc về Phố Hiến…",f:"Carousel 6 slide",d:"—",g:"19:00"},
  {n:3,p:"P2",t:"Một ngày của tôi: sáng biển hồ, chiều nội đô",h:"Lifestyle mà 3 năm trước tôi không biết là có thật — và bây giờ tôi không muốn đổi.",f:"Reels 60s",d:"—",g:"08:00"},
  {n:4,p:"P3",t:"Vì sao tôi bán cả Imperia của MIK lẫn Masteri của Masterise?",h:"Vì agent của 1 dự án chỉ có thể khen dự án đó. Tôi thì khác.",f:"Post text + ảnh",d:"Cả 2",g:"11:00"},
  {n:5,p:"P4",t:"Phía Đông Hà Nội 2026 — bức tranh tổng quan",h:"Tôi đọc 15 báo cáo trong 2 tuần qua. Đây là 5 điều bạn cần biết.",f:"Carousel 6 slide",d:"—",g:"15:00"},
  {n:6,p:"P1",t:"Sông Hồng — tuyến giao thương lớn nhất Bắc Bộ đang hồi sinh",h:"Nó từng nuôi cả Phố Hiến, Thăng Long. Và bây giờ nó chảy qua cửa nhà bạn.",f:"Reels 90s",d:"—",g:"20:00"},
  {n:7,p:"P1",t:"Tour cửa ngõ phía Đông ngày Chủ Nhật — đi cùng tôi",h:"Tôi mang máy quay, không kịch bản, không CDT. Chỉ có dòng sông.",f:"Reels 90s",d:"—",g:"08:00"},
  {n:8,p:"P1",t:"4 thế hệ cửa ngõ Đông kể về quê hương — phim ngắn",h:"Bác Hùng 78 tuổi: 'Cháu trẻ — mà cháu là người đầu tiên hỏi bác chuyện này'.",f:"Video phỏng vấn 3p",d:"—",g:"19:00"},
  {n:9,p:"P2",t:"Tôi mới chuyển ra phía Đông 3 tháng — 5 điều bất ngờ",h:"Số 3 sẽ làm bạn nghĩ lại định nghĩa 'tiện nghi'.",f:"Carousel 7 slide",d:"—",g:"11:00"},
  {n:10,p:"P3",t:"Imperia (MIK) & Masteri (Masterise) — 2 thương hiệu, 1 vùng đất",h:"Cùng nằm trong Ocean City. Đây là khác biệt cốt lõi giữa hai.",f:"Carousel 8 slide",d:"Cả 2",g:"15:00"},
  {n:11,p:"P4",t:"Cầu Trần Hưng Đạo & Vành đai 4 — vì sao phía Đông đang đổi vận",h:"Hạ tầng đi trước, giá đi sau. Đây là công thức tôi dùng để chọn vùng.",f:"Post phân tích",d:"—",g:"08:00"},
  {n:12,p:"P1",t:"Phố cổ Hưng Yên hôm nay & Ocean City ngày mai — 2 khung hình cạnh nhau",h:"Bạn nhận ra gì khi 400 năm hội ngộ trong 1 bức ảnh?",f:"Reels 30s",d:"—",g:"20:00"},
  {n:13,p:"P2",t:"Day-in-life: sáng cafe phố cổ, chiều xem nhà, tối nội đô",h:"Trong 1 ngày tôi đi qua 400 năm. Cảm giác bạn không có khi ở 1 thành phố thuần.",f:"Reels 90s",d:"—",g:"08:00"},
  {n:14,p:"P2",t:"Smart home cứu được mấy phút mỗi ngày? Tôi tính thử",h:"Tôi không tin marketing. Tôi đếm phút. Đây là con số thật.",f:"Carousel 6 slide",d:"Masteri",g:"11:00"},
  {n:15,p:"P3",t:"Hot take: Tôi KHÔNG thích chung cư nội đô (và đây là lý do)",h:"Quan điểm này sẽ làm vài bạn không đồng ý. Nhưng tôi nói thật.",f:"Post dài",d:"—",g:"19:00"},
  {n:16,p:"P1",t:"The Parkland đang viết tiếp câu chuyện 'phố cổ mới' như thế nào?",h:"Tôi đi thực địa và đây là 3 chi tiết làm tôi đứng lại.",f:"Reels 60s",d:"Imperia · MIK",g:"15:00"},
  {n:17,p:"P4",t:"Lãi suất & chính sách hỗ trợ 0–6% — tác động THẬT đến quyết định mua",h:"Không nói chung chung. Tôi tính cho bạn 1 case cụ thể.",f:"Carousel 6 slide",d:"Cả 2",g:"08:00"},
  {n:18,p:"P5",t:"Sau 3 tuần làm kênh — điều bất ngờ nhất với tôi",h:"Tôi nghĩ sẽ khó hơn nhiều. Một điều đã thay đổi tôi.",f:"Post ngắn",d:"—",g:"20:00"},
  {n:19,p:"P3",t:"Live FB #1: 'Hỏi gì cũng trả lời về BĐS phía Đông' (45 phút)",h:"Không chuẩn bị câu hỏi. Imperia, Masteri, hạ tầng — hỏi gì trả lời nấy.",f:"Facebook Live",d:"Cả 2",g:"20:00"},
  {n:20,p:"P4",t:"Bản tin tuần phía Đông — 5 tin & 1 cơ hội ít người để ý",h:"Mỗi tuần tôi đọc 15 báo cáo. Đây là phần thưởng cho 2h đọc của bạn.",f:"Carousel 6 slide",d:"Cả 2",g:"08:00"},
  {n:21,p:"P1",t:"Kiến trúc Imperia — Đông & Tây đối thoại bên sông Hồng",h:"Đường nét cổ điển cạnh khối kính hiện đại — gượng hay đẹp?",f:"Reels 60s",d:"Imperia · MIK",g:"19:00"},
  {n:22,p:"P2",t:"Tôi đi mua nhà cho gia đình mình — 5 thứ tôi đặt lên đầu",h:"Trước tiện ích, trước giá. Đây là bộ lọc cá nhân của tôi.",f:"Carousel 7 slide",d:"—",g:"11:00"},
  {n:23,p:"P3",t:"Tôi đi thực địa Imperia & Masteri trong 1 ngày — nhận xét thật",h:"Sáng Imperia. Trưa Masteri Grand Coast. Tối tôi ngồi viết bài này.",f:"Reels 90s",d:"Cả 2",g:"15:00"},
  {n:24,p:"P5",t:"Tổng kết tháng 1 — số liệu thật, không marketing",h:"Followers, lead, deal, content nào hit. Tất cả công khai.",f:"Post milestone",d:"—",g:"20:00"},
  {n:25,p:"P1",t:"Phim ngắn: 'Cửa ngõ Đông qua 4 thế hệ' (5 phút)",h:"Tôi xin phép 4 bác trong làng. Họ đồng ý kể. Đây là kết quả.",f:"Video 5p",d:"—",g:"19:00"},
  {n:26,p:"P4",t:"Quy hoạch phía Đông 2026–2030 — tôi đọc và giải thích bằng tiếng Việt",h:"1 file PDF 80 trang → 1 bài 8 slide. Đây là chắt lọc.",f:"Carousel 8 slide",d:"—",g:"11:00"},
  {n:27,p:"P3",t:"Case study #1: Khách mua Imperia vì 1 câu chuyện, không phải vì giá",h:"Anh K nói: 'Tôi mua không phải vì giá. Tôi mua vì bài của em về Phố Hiến.'",f:"Post dài + ảnh",d:"Imperia · MIK",g:"20:00"},
  {n:28,p:"P2",t:"Sống ven sông Hồng khác gì sống ven hồ nội đô? Tôi đã thử cả 2",h:"Đây là 4 cảm nhận không có trong brochure nào.",f:"Reels 60s",d:"—",g:"08:00"},
  {n:29,p:"P1",t:"Sông Hồng — không chỉ là dòng sông. Đây là một mạch tài lộc.",h:"Phong thủy không mê tín nếu bạn hiểu nó là logic về dòng chảy & sinh khí.",f:"Post dài",d:"—",g:"15:00"},
  {n:30,p:"P4",t:"Bản tin tuần — Masteri Era Landmark sắp ra phân khu mới",h:"Tôi đã đi thực địa. Đây là góc nhìn không có trong brochure.",f:"Post update",d:"Masteri",g:"19:00"}
];

const DOW = ["CN", "T2", "T3", "T4", "T5", "T6", "T7"];

export default function MarketingDashboard({ tab, currentUser, token }) {
  const [selectedSheetUser, setSelectedSheetUser] = useState(localStorage.getItem('hiep90:selected_sheet_user') || 'default');
  const [usersList, setUsersList] = useState(['default']);
  const [posts, setPosts] = useState(DEFAULT_POSTS_STATIC);
  const [doneStates, setDoneStates] = useState({});
  const [kpiData, setKpiData] = useState({});
  const [brandHealthData, setBrandHealthData] = useState({});
  
  const [notes, setNotes] = useState([]);
  const [noteText, setNoteText] = useState('');
  const [startDate, setStartDate] = useState(localStorage.getItem('hiep90:start') || new Date().toISOString().slice(0, 10));
  const [viewMode, setViewMode] = useState(localStorage.getItem('hiep90:view_mode') || 'cards');
  
  // Filters
  const [filterPillar, setFilterPillar] = useState('all');
  const [filterPhase, setFilterPhase] = useState('all');
  const [filterStatus, setFilterStatus] = useState('all');
  const [storyFilter, setStoryFilter] = useState('all');

  const suffix = selectedSheetUser === 'default' ? '' : `_user_${selectedSheetUser}`;
  const KEY = 'hiep90:';

  // Load local storage fallback
  const localLoad = (key, fallback) => {
    const realKey = (key === 'kpi' || key === 'bh' || key === 'posts' || key === 'posts_list') && selectedSheetUser !== 'default' 
      ? `${key}_user_${selectedSheetUser}` 
      : key;
    try {
      const res = localStorage.getItem(KEY + realKey);
      return res ? JSON.parse(res) : fallback;
    } catch (_) {
      return fallback;
    }
  };

  const localSave = (key, val) => {
    const realKey = (key === 'kpi' || key === 'bh' || key === 'posts' || key === 'posts_list') && selectedSheetUser !== 'default' 
      ? `${key}_user_${selectedSheetUser}` 
      : key;
    try {
      localStorage.setItem(KEY + realKey, JSON.stringify(val));
    } catch (_) {}
  };

  // Sync to server
  const syncWithServer = (currentPosts, currentDone, currentKpi, currentBh) => {
    if (!token) return;
    fetch('/api/marketing/sync', {
      method: 'POST',
      headers: { 
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ 
        username: selectedSheetUser, 
        posts_list: currentPosts || posts, 
        posts: currentDone || doneStates,
        kpi: currentKpi || kpiData, 
        bh: currentBh || brandHealthData
      })
    }).catch(e => console.error("Sync error:", e));
  };

  // Fetch initial data
  const fetchData = () => {
    if (!token) return;
    fetch('/api/marketing/data', {
      headers: { 'Authorization': `Bearer ${token}` }
    })
      .then(res => res.json())
      .then(data => {
        if (data.users) {
          const list = ['default', ...Object.keys(data.users).filter(u => u !== 'default')];
          setUsersList(list);
          
          // Cache all users dynamically
          Object.keys(data.users).forEach(u => {
            const suf = u === 'default' ? '' : `_user_${u}`;
            const uData = data.users[u];
            if (uData) {
              if (uData.posts_list) localStorage.setItem(KEY + "posts_list" + suf, JSON.stringify(uData.posts_list));
              if (uData.posts) localStorage.setItem(KEY + "posts" + suf, JSON.stringify(uData.posts));
              if (uData.kpi) localStorage.setItem(KEY + "kpi" + suf, JSON.stringify(uData.kpi));
              if (uData.bh) localStorage.setItem(KEY + "bh" + suf, JSON.stringify(uData.bh));
            }
          });
        }
        
        if (data.notes) setNotes(data.notes);
        
        // Load active sheet user state
        const savedPosts = localLoad('posts_list', null);
        if (savedPosts && savedPosts.length > 0) setPosts(savedPosts);
        else setPosts(DEFAULT_POSTS_STATIC);
        
        setDoneStates(localLoad('posts', {}));
        setKpiData(localLoad('kpi', {}));
        setBrandHealthData(localLoad('bh', {}));
      })
      .catch(e => {
        console.log("Running in offline mode", e);
        const savedPosts = localLoad('posts_list', null);
        if (savedPosts) setPosts(savedPosts);
        setDoneStates(localLoad('posts', {}));
        setKpiData(localLoad('kpi', {}));
        setBrandHealthData(localLoad('bh', {}));
      });
  };

  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 5000);
    return () => clearInterval(interval);
  }, [selectedSheetUser, token]);

  const handleUserChange = (val) => {
    if (val === '__new__') {
      const name = prompt("Nhập tên người dùng mới để tạo lịch riêng:");
      if (name && name.trim()) {
        const cleanName = name.trim();
        if (!usersList.includes(cleanName)) {
          setUsersList([...usersList, cleanName]);
        }
        setSelectedSheetUser(cleanName);
        localStorage.setItem('hiep90:selected_sheet_user', cleanName);
        
        const suf = `_user_${cleanName}`;
        localStorage.setItem(KEY + "posts_list" + suf, JSON.stringify(DEFAULT_POSTS_STATIC));
        localStorage.setItem(KEY + "posts" + suf, JSON.stringify({}));
        localStorage.setItem(KEY + "kpi" + suf, JSON.stringify({}));
        localStorage.setItem(KEY + "bh" + suf, JSON.stringify({}));
        
        setPosts(DEFAULT_POSTS_STATIC);
        setDoneStates({});
        setKpiData({});
        setBrandHealthData({});
        
        // Save immediately
        setTimeout(() => {
          syncWithServer(DEFAULT_POSTS_STATIC, {}, {}, {});
        }, 100);
      }
    } else {
      setSelectedSheetUser(val);
      localStorage.setItem('hiep90:selected_sheet_user', val);
      
      const suf = val === 'default' ? '' : `_user_${val}`;
      const saved = JSON.parse(localStorage.getItem(KEY + "posts_list" + suf));
      if (saved) setPosts(saved);
      else setPosts(DEFAULT_POSTS_STATIC);
      
      setDoneStates(JSON.parse(localStorage.getItem(KEY + "posts" + suf)) || {});
      setKpiData(JSON.parse(localStorage.getItem(KEY + "kpi" + suf)) || {});
      setBrandHealthData(JSON.parse(localStorage.getItem(KEY + "bh" + suf)) || {});
    }
  };

  const getMonday = (d) => {
    const x = new Date(d);
    const day = x.getDay();
    const diff = (day === 0 ? -6 : 1 - day);
    x.setDate(x.getDate() + diff);
    x.setHours(0, 0, 0, 0);
    return x;
  };

  const fmtDate = (d) => {
    return String(d.getDate()).padStart(2, "0") + "/" + String(d.getMonth() + 1).padStart(2, "0");
  };

  const phaseOfWeek = (w) => {
    return w <= 4 ? 1 : (w <= 8 ? 2 : 3);
  };

  const getActiveUser = () => {
    return currentUser ? currentUser.name || currentUser.username : "Offline User";
  };

  const sendNote = () => {
    if (!noteText.trim() || !token) return;
    fetch('/api/marketing/notes', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
      body: JSON.stringify({ user: getActiveUser(), text: noteText })
    })
      .then(res => res.json())
      .then(res => {
        if (res.success) {
          setNoteText('');
          fetchData();
        }
      })
      .catch(e => console.error("Error sending note:", e));
  };

  // Rendering Tabs
  const renderOverview = () => (
    <div className="space-y-6">
      <div className="card-glass p-6">
        <h3 className="text-xl font-bold text-amber-500 mb-2">Đại Dự Án Imperia Ocean City (MIK Group)</h3>
        <p className="text-slate-300 text-sm mb-4">Các phân khu đẳng cấp được triển khai bởi MIK Group tại trung tâm đô thị phía Đông.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-slate-950/40 rounded-xl border border-slate-800">
            <h5 className="font-bold text-slate-100">The Sola Park</h5>
            <p className="text-xs text-slate-400 mt-1">Hà Nội · Phân khu căn hộ thông minh sở hữu tọa độ cửa ngõ gần cầu Tứ Liên.</p>
          </div>
          <div className="p-4 bg-slate-950/40 rounded-xl border border-slate-800">
            <h5 className="font-bold text-slate-100">Imperia Smart City</h5>
            <p className="text-xs text-slate-400 mt-1">Hà Nội · Tổ hợp căn hộ cao cấp ngay trục đại lộ xanh.</p>
          </div>
          <div className="p-4 bg-slate-950/40 rounded-xl border border-slate-800">
            <h5 className="font-bold text-slate-100">Imperia Grand Plaza</h5>
            <p className="text-xs text-slate-400 mt-1">Hồ Chí Minh/Long An · Tuyến phố thương mại shophouse đắt giá.</p>
          </div>
        </div>
      </div>

      <div className="card-glass p-6">
        <h3 className="text-xl font-bold text-indigo-400 mb-2">Đại Dự Án Masteri (Masterise Homes)</h3>
        <p className="text-slate-300 text-sm mb-4">Các dòng căn hộ Premium và Luxury của Masterise Homes sở hữu đặc quyền biển hồ.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-slate-950/40 rounded-xl border border-slate-800">
            <h5 className="font-bold text-slate-100">Masteri Waterfront</h5>
            <p className="text-xs text-slate-400 mt-1">Hà Nội (Ocean City) · View trực diện biển hồ nước mặn, tiện ích cao cấp.</p>
          </div>
          <div className="p-4 bg-slate-950/40 rounded-xl border border-slate-800">
            <h5 className="font-bold text-slate-100">Lumière Evergreen</h5>
            <p className="text-xs text-slate-400 mt-1">Hà Nội · Dòng sản phẩm căn hộ hạng sang kế bên hồ cảnh quan.</p>
          </div>
          <div className="p-4 bg-slate-950/40 rounded-xl border border-slate-800">
            <h5 className="font-bold text-slate-100">Masteri Centre Point</h5>
            <p className="text-xs text-slate-400 mt-1">TP.HCM · Căn hộ compound cao cấp biệt lập khép kín.</p>
          </div>
        </div>
      </div>

      <div className="card-glass p-6">
        <h3 className="text-xl font-bold text-emerald-400 mb-2">Dự Án Sunshine Group</h3>
        <p className="text-slate-300 text-sm mb-4">Các tổ hợp căn hộ cao cấp và bất động sản công nghệ ven sông của Sunshine.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-slate-950/40 rounded-xl border border-slate-800">
            <h5 className="font-bold text-slate-100">Sunshine City / Crystal River</h5>
            <p className="text-xs text-slate-400 mt-1">Hà Nội · Biệt thự trên không Ciputra ven sông Hồng đắt giá.</p>
          </div>
          <div className="p-4 bg-slate-950/40 rounded-xl border border-slate-800">
            <h5 className="font-bold text-slate-100">Sunshine Golden River</h5>
            <p className="text-xs text-slate-400 mt-1">Hà Nội · Căn hộ cao cấp sở hữu sân vườn riêng rộng lớn.</p>
          </div>
          <div className="p-4 bg-slate-950/40 rounded-xl border border-slate-800">
            <h5 className="font-bold text-slate-100">Sunshine Diamond River</h5>
            <p className="text-xs text-slate-400 mt-1">TP.HCM (Quận 7) · Đô thị nghỉ dưỡng công nghệ xanh sinh thái ven sông.</p>
          </div>
        </div>
      </div>

      {/* Collaboration Board */}
      <div className="card-glass p-6 mt-6">
        <h3 className="text-lg font-bold text-amber-500 mb-4 flex items-center gap-2">
          <Send style={{width:16,height:16}}/>
          Bảng Trao Đổi Cộng Tác Thời Gian Thực
        </h3>
        
        <div className="flex gap-2 mb-4">
          <input 
            type="text" 
            placeholder="Viết ghi chú, giao việc hoặc ý tưởng của bạn vào đây..." 
            value={noteText}
            onChange={e => setNoteText(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && sendNote()}
            className="flex-1 bg-slate-950/80 border border-slate-800 rounded-xl p-3 text-slate-200 outline-none focus:border-amber-500 text-sm"
          />
          <button onClick={sendNote} className="bg-amber-500 hover:bg-amber-600 text-slate-950 px-5 rounded-xl font-bold text-sm transition-all flex items-center gap-1">
            Gửi
          </button>
        </div>

        <div className="space-y-3 max-h-64 overflow-y-auto pr-2 custom-scrollbar">
          {notes.length === 0 ? (
            <p className="text-slate-500 text-sm text-center py-4">Chưa có ghi chú nào. Hãy viết thảo luận đầu tiên!</p>
          ) : (
            notes.map(n => (
              <div key={n.id} className="p-3 bg-slate-950/40 rounded-lg border border-slate-800/60">
                <div className="flex justify-between items-center text-xs text-slate-400 mb-1">
                  <span className="font-bold text-amber-500 flex items-center gap-1">
                    <User style={{width:12,height:12}}/> {n.user}
                  </span>
                  <span>{new Date(n.time).toLocaleTimeString('vi-VN')} {new Date(n.time).toLocaleDateString('vi-VN')}</span>
                </div>
                <p className="text-slate-200 text-sm">{n.text}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );

  const renderPositioning = () => (
    <div className="space-y-6">
      <div className="card-glass p-6">
        <h3 className="text-lg font-bold text-amber-500 mb-4">Định Vị Storyteller Vùng Đất</h3>
        <p className="text-slate-300 text-sm leading-relaxed mb-4">
          Bạn không đóng vai trò một môi giới bất động sản truyền thống chào bán căn hộ bằng các khuyến mãi, chiết khấu. Bạn định vị mình là một **Storyteller Vùng Đất** phía Đông Hà Nội.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="p-4 bg-emerald-950/20 border border-emerald-900/40 rounded-xl">
            <h5 className="font-bold text-emerald-400 mb-1">Nên Làm (Do)</h5>
            <ul className="text-xs text-slate-300 list-disc list-inside space-y-1">
              <li>Chia sẻ tư liệu lịch sử, văn hóa sông Hồng, Phố Hiến</li>
              <li>Chụp ảnh candid đời thường tại Ocean City chân thực</li>
              <li>Nhận định kinh tế vĩ mô có phân tích chuyên sâu</li>
            </ul>
          </div>
          <div className="p-4 bg-red-950/20 border border-red-900/40 rounded-xl">
            <h5 className="font-bold text-red-400 mb-1">Tránh Làm (Don't)</h5>
            <ul className="text-xs text-slate-300 list-disc list-inside space-y-1">
              <li>Không đăng tin giật gân, thiếu kiểm chứng</li>
              <li>Không sao chép báo chí khô khan không có nhận định riêng</li>
              <li>Không flex doanh số cá nhân hay hô hào FOMO mua gấp</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPlan = () => (
    <div className="space-y-6">
      <div className="card-glass p-6">
        <h3 className="text-lg font-bold text-amber-500 mb-4">Lộ Trình Hành Động 90 Ngày</h3>
        <div className="relative border-l border-indigo-950/60 ml-4 pl-6 space-y-6">
          <div className="relative">
            <div className="absolute -left-[18px] top-1.5 w-3.5 h-3.5 rounded-full bg-indigo-500 border border-slate-900"/>
            <h5 className="font-bold text-indigo-400">Giai đoạn 1: Awareness (D1 - D30)</h5>
            <p className="text-xs text-slate-400 mt-1">Định vị thương hiệu cá nhân, tạo nhận biết đầu tiên về dòng sông và vùng đất phía Đông.</p>
          </div>
          <div className="relative">
            <div className="absolute -left-[18px] top-1.5 w-3.5 h-3.5 rounded-full bg-amber-500 border border-slate-900"/>
            <h5 className="font-bold text-amber-500">Giai đoạn 2: Authority (D31 - D60)</h5>
            <p className="text-xs text-slate-400 mt-1">Khẳng định kiến thức chuyên môn vĩ mô, nhắm tới mốc 3.000 followers chất lượng cao.</p>
          </div>
          <div className="relative">
            <div className="absolute -left-[18px] top-1.5 w-3.5 h-3.5 rounded-full bg-emerald-500 border border-slate-900"/>
            <h5 className="font-bold text-emerald-400">Giai đoạn 3: Conversion (D61 - D90)</h5>
            <p className="text-xs text-slate-400 mt-1">Khách hàng tương tác sâu thông qua các case study thực tế, chốt deals và referral tự nhiên.</p>
          </div>
        </div>
      </div>
    </div>
  );

  const renderPillars = () => (
    <div className="space-y-4">
      {PILLARS_FULL.map(p => (
        <div key={p.id} className="card-glass p-6 border-l-4" style={{borderLeftColor: p.col}}>
          <div className="flex justify-between items-center mb-2">
            <h4 className="text-lg font-bold text-slate-100 flex items-center gap-2">
              <span>{p.icn}</span> {p.nm}
            </h4>
            <span className="text-xs font-mono text-amber-500 bg-slate-950/80 px-3 py-1 rounded-full border border-slate-800">{p.freq}</span>
          </div>
          <p className="text-sm italic text-slate-400 mb-3">{p.core}</p>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div>
              <span className="font-bold text-emerald-400 block mb-1">Nên khai thác:</span>
              <ul className="list-disc list-inside space-y-1 text-slate-300">
                {p.is.map((x, idx) => <li key={idx}>{x}</li>)}
              </ul>
            </div>
            <div>
              <span className="font-bold text-red-400 block mb-1">Cần tránh:</span>
              <ul className="list-disc list-inside space-y-1 text-slate-300">
                {p.isnot.map((x, idx) => <li key={idx}>{x}</li>)}
              </ul>
            </div>
          </div>
        </div>
      ))}
    </div>
  );

  const renderStoryBank = () => (
    <div className="space-y-6">
      <div className="flex gap-2">
        {['all', 'P1', 'P2', 'P3', 'P4', 'P5', 'P6'].map(f => (
          <button 
            key={f}
            onClick={() => setStoryFilter(f)}
            className={`px-4 py-1.5 rounded-lg text-xs font-bold transition-all border ${
              storyFilter === f 
                ? 'bg-amber-500 text-slate-950 border-amber-500' 
                : 'bg-slate-950/60 border-slate-800 text-slate-400 hover:text-white'
            }`}
          >
            {f === 'all' ? 'Tất cả' : f}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {STORY.filter(s => storyFilter === 'all' || s[0] === storyFilter).map((s, idx) => (
          <div key={idx} className="card-glass p-5 border-l-4" style={{borderLeftColor: `var(--${s[0].toLowerCase()})`}}>
            <div className="flex justify-between items-center mb-2">
              <span className={`px-2 py-0.5 rounded text-[10px] font-bold text-white bg-slate-950/80 border border-slate-800`}>
                {s[0]}
              </span>
              <span className="text-xs text-slate-400 font-mono">{s[1]}</span>
            </div>
            <h5 className="font-bold text-slate-100 text-sm mb-2">{s[2]}</h5>
            <p className="text-xs text-slate-300 leading-relaxed">{s[3]}</p>
          </div>
        ))}
      </div>
    </div>
  );

  const renderVisual = () => (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {VCONCEPTS.map((v, idx) => (
        <div key={idx} className="card-glass p-5 border-l-4" style={{borderLeftColor: `var(--${v[0].toLowerCase()})`}}>
          <div className="flex justify-between items-center mb-2">
            <span className="text-xs font-bold text-amber-500">{v[0]} · {v[1]}</span>
            <span className="text-xs text-slate-400">{v[2]}</span>
          </div>
          <p className="text-xs text-slate-200 leading-relaxed mb-3 bg-slate-950/60 p-3 rounded-lg border border-slate-800/40">{v[3]}</p>
          <div className="text-[11px] text-emerald-400 bg-emerald-950/10 border border-emerald-900/30 p-2.5 rounded-lg">
            📷 Camera spec: {v[4]}
          </div>
        </div>
      ))}
    </div>
  );

  // CRM TABLE ACTIONS
  const updatePost = (index, key, val) => {
    const updated = [...posts];
    updated[index][key] = val;
    setPosts(updated);
    localSave('posts_list', updated);
    syncWithServer(updated, null, null, null);
  };

  const toggleCheck = (n) => {
    const updated = { ...doneStates };
    updated[n] = !updated[n];
    setDoneStates(updated);
    localSave('posts', updated);
    
    // Update status in posts array
    const updatedPosts = posts.map(p => {
      if (p.n === n) {
        return { ...p, status: updated[n] ? 'done' : 'todo' };
      }
      return p;
    });
    setPosts(updatedPosts);
    localSave('posts_list', updatedPosts);

    syncWithServer(updatedPosts, updated, null, null);
  };

  const addPost = () => {
    const nextNum = posts.length + 1;
    const newPost = {
      n: nextNum,
      p: "P6",
      t: "Tiêu đề bài viết mới #" + nextNum,
      h: "Ý tưởng nội dung mới...",
      f: "Reels 60s",
      d: "—",
      g: "09:00",
      status: "todo",
      notes: ""
    };
    const updated = [...posts, newPost];
    setPosts(updated);
    localSave('posts_list', updated);
    syncWithServer(updated, null, null, null);
  };

  const deletePost = (index, n) => {
    if (!window.confirm(`Bạn có chắc muốn xóa bài viết #${n}?`)) return;
    const updated = posts.filter((_, idx) => idx !== index);
    // recalculate #
    updated.forEach((p, idx) => p.n = idx + 1);
    setPosts(updated);
    localSave('posts_list', updated);
    syncWithServer(updated, null, null, null);
  };

  const renderSchedule = () => {
    const doneCount = Object.values(doneStates).filter(Boolean).length;
    const totalCount = posts.length;
    const pct = Math.round((doneCount / (totalCount || 1)) * 100);

    return (
      <div className="space-y-6">
        <div className="flex flex-wrap gap-4 items-center justify-between bg-slate-950/40 p-4 rounded-xl border border-slate-800">
          <div className="flex items-center gap-4">
            <label className="text-xs text-slate-400 flex flex-col font-bold">
              Ngày bắt đầu
              <input 
                type="date" 
                value={startDate}
                onChange={e => {
                  setStartDate(e.target.value);
                  localStorage.setItem('hiep90:start', e.target.value);
                }}
                className="mt-1 bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-200 text-xs outline-none"
              />
            </label>

            <label className="text-xs text-slate-400 flex flex-col font-bold">
              Lọc theo Pillar
              <select 
                value={filterPillar} 
                onChange={e => setFilterPillar(e.target.value)}
                className="mt-1 bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-200 text-xs outline-none"
              >
                <option value="all">Tất cả pillar</option>
                {['P1', 'P2', 'P3', 'P4', 'P5', 'P6'].map(p => <option key={p} value={p}>{p}</option>)}
              </select>
            </label>

            <label className="text-xs text-slate-400 flex flex-col font-bold">
              Giai đoạn
              <select 
                value={filterPhase} 
                onChange={e => setFilterPhase(e.target.value)}
                className="mt-1 bg-slate-950 border border-slate-800 rounded-lg p-2 text-slate-200 text-xs outline-none"
              >
                <option value="all">Cả 90 ngày</option>
                <option value="1">GĐ1 (T1-4)</option>
                <option value="2">GĐ2 (T5-8)</option>
                <option value="3">GĐ3 (T9-12)</option>
              </select>
            </label>

            <label className="text-xs text-slate-400 flex flex-col font-bold">
              Xem & chỉnh sửa lịch của
              <select 
                value={selectedSheetUser} 
                onChange={e => handleUserChange(e.target.value)}
                className="mt-1 bg-slate-950 border border-slate-800 rounded-lg p-2 text-amber-500 font-bold text-xs outline-none"
              >
                {usersList.map(u => (
                  <option key={u} value={u}>
                    {u === 'default' ? 'Lịch chung (Mặc định)' : `Lịch của ${u}`}
                  </option>
                ))}
                <option value="__new__">➕ Tạo lịch mới...</option>
              </select>
            </label>
          </div>

          <div className="flex gap-2">
            <button 
              onClick={() => { setViewMode('cards'); localStorage.setItem('hiep90:view_mode', 'cards'); }}
              className={`p-2 rounded-lg transition-all ${viewMode === 'cards' ? 'bg-amber-500 text-slate-950' : 'bg-slate-900 text-slate-400'}`}
            >
              <Eye style={{width:16,height:16}}/>
            </button>
            <button 
              onClick={() => { setViewMode('table'); localStorage.setItem('hiep90:view_mode', 'table'); }}
              className={`p-2 rounded-lg transition-all ${viewMode === 'table' ? 'bg-amber-500 text-slate-950' : 'bg-slate-900 text-slate-400'}`}
            >
              <Grid style={{width:16,height:16}}/>
            </button>
          </div>
        </div>

        {/* Progress */}
        <div className="flex items-center gap-4 bg-slate-950/20 p-4 rounded-xl border border-slate-800/40">
          <div className="flex-1">
            <div className="flex justify-between text-xs text-slate-400 font-bold mb-1">
              <span>Tiến độ hoàn thành:</span>
              <span className="text-amber-500">{doneCount}/{totalCount} bài ({pct}%)</span>
            </div>
            <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800">
              <div className="bg-amber-500 h-full transition-all duration-300" style={{width: `${pct}%`}}/>
            </div>
          </div>
          {viewMode === 'table' && (
            <button onClick={addPost} className="bg-emerald-500 hover:bg-emerald-600 text-slate-950 font-bold text-xs px-4 py-2.5 rounded-lg flex items-center gap-1.5 transition-all">
              <Plus style={{width:14,height:14}}/> Thêm bài viết mới
            </button>
          )}
        </div>

        {viewMode === 'cards' ? (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {posts
              .filter(p => filterPillar === 'all' || p.p === filterPillar)
              .filter(p => {
                if (filterPhase === 'all') return true;
                const week = Math.ceil(p.n / 6);
                return phaseOfWeek(week) === parseInt(filterPhase);
              })
              .map((p, index) => {
                const week = Math.ceil(p.n / 6);
                const dayInWeek = (p.n - 1) % 6;
                const dt = getMonday(startDate);
                dt.setDate(dt.getDate() + (week - 1) * 7 + dayInWeek);
                const isDone = !!doneStates[p.n];

                return (
                  <div key={p.n} className={`card-glass p-5 border-l-4 ${isDone ? 'opacity-60' : ''}`} style={{borderLeftColor: `var(--${p.p.toLowerCase()})`}}>
                    <div className="flex justify-between items-start mb-2">
                      <div className="flex items-center gap-2">
                        <span className="tag-p text-[10px] font-bold text-white bg-slate-950/80 border border-slate-800" style={{borderColor:`var(--${p.p.toLowerCase()})`}}>
                          {p.p}
                        </span>
                        <span className="text-xs text-slate-400 font-mono">#{p.n}</span>
                      </div>
                      <input 
                        type="checkbox" 
                        checked={isDone}
                        onChange={() => toggleCheck(p.n)}
                        className="w-4 h-4 accent-amber-500 rounded border-slate-700 bg-slate-950 text-slate-200 focus:ring-amber-500/20"
                      />
                    </div>
                    <h5 className="font-bold text-slate-100 text-sm mb-1">{p.t}</h5>
                    <p className="text-xs text-slate-400 mb-3">{p.h}</p>
                    <div className="flex flex-wrap gap-2 text-[10px] text-slate-500">
                      <span className="bg-slate-950/60 px-2 py-0.5 rounded border border-slate-800">{p.f}</span>
                      {p.d !== '—' && <span className="bg-slate-950/60 px-2 py-0.5 rounded border border-slate-800 text-amber-500">{p.d}</span>}
                      <span className="bg-slate-950/60 px-2 py-0.5 rounded border border-slate-800">{p.g}</span>
                      <span className="bg-slate-950/60 px-2 py-0.5 rounded border border-slate-800 font-bold text-slate-400">
                        {DOW[dt.getDay()]} · {fmtDate(dt)} (Tuần {week})
                      </span>
                    </div>
                    {p.notes && <div className="mt-2 text-xs text-amber-500/80 italic font-medium">📝 {p.notes}</div>}
                  </div>
                );
              })}
          </div>
        ) : (
          <div className="crm-table-container custom-scrollbar">
            <table className="crm-table">
              <thead>
                <tr>
                  <th style={{width: 40}}>#</th>
                  <th style={{width: 130}}>Ngày đăng</th>
                  <th style={{width: 120}}>Trạng thái</th>
                  <th style={{width: 90}}>Pillar</th>
                  <th>Tiêu đề bài viết</th>
                  <th>Hook / Ý tưởng chính</th>
                  <th style={{width: 120}}>Định dạng</th>
                  <th style={{width: 100}}>Dự án</th>
                  <th style={{width: 80}}>Giờ</th>
                  <th style={{width: 160}}>Phụ trách / Ghi chú</th>
                  <th style={{width: 60}}>Thao tác</th>
                </tr>
              </thead>
              <tbody>
                {posts
                  .map((p, index) => {
                    const week = Math.ceil(p.n / 6);
                    const dayInWeek = (p.n - 1) % 6;
                    const dt = getMonday(startDate);
                    dt.setDate(dt.getDate() + (week - 1) * 7 + dayInWeek);
                    const isDone = !!doneStates[p.n];
                    const dateStr = `${fmtDate(dt)} (T.${week})`;

                    if (filterPillar !== 'all' && p.p !== filterPillar) return null;
                    if (filterPhase !== 'all' && phaseOfWeek(week) !== parseInt(filterPhase)) return null;

                    return (
                      <tr key={p.n} style={{background: isDone ? 'rgba(16,185,129,0.03)' : 'transparent'}}>
                        <td className="text-center font-mono text-slate-500 text-xs">{p.n}</td>
                        <td className="text-slate-400 text-xs font-medium">{dateStr}</td>
                        <td>
                          <select 
                            value={isDone ? 'done' : (p.status || 'todo')}
                            onChange={e => {
                              const val = e.target.value;
                              const updatedDone = { ...doneStates };
                              updatedDone[p.n] = (val === 'done');
                              setDoneStates(updatedDone);
                              localSave('posts', updatedDone);
                              updatePost(index, 'status', val);
                            }}
                            className="crm-select text-xs"
                          >
                            <option value="todo">🔴 Chưa đăng</option>
                            <option value="draft">🟡 Đang nháp</option>
                            <option value="done">🟢 Đã đăng</option>
                          </select>
                        </td>
                        <td>
                          <select 
                            value={p.p}
                            onChange={e => updatePost(index, 'p', e.target.value)}
                            className="crm-select text-xs font-bold"
                            style={{color: `var(--${p.p.toLowerCase()})`}}
                          >
                            {['P1', 'P2', 'P3', 'P4', 'P5', 'P6'].map(x => <option key={x} value={x}>{x}</option>)}
                          </select>
                        </td>
                        <td>
                          <textarea 
                            value={p.t || ''} 
                            onChange={e => updatePost(index, 't', e.target.value)}
                            className="crm-textarea text-xs"
                          />
                        </td>
                        <td>
                          <textarea 
                            value={p.h || ''} 
                            onChange={e => updatePost(index, 'h', e.target.value)}
                            className="crm-textarea text-xs"
                          />
                        </td>
                        <td>
                          <textarea 
                            value={p.f || ''} 
                            onChange={e => updatePost(index, 'f', e.target.value)}
                            className="crm-textarea text-xs"
                          />
                        </td>
                        <td>
                          <select 
                            value={p.d || '—'}
                            onChange={e => updatePost(index, 'd', e.target.value)}
                            className="crm-select text-xs"
                          >
                            {['—', 'MIK', 'Masterise', 'Sunshine', 'Cả 2'].map(d => <option key={d} value={d}>{d}</option>)}
                          </select>
                        </td>
                        <td>
                          <input 
                            type="text"
                            value={p.g || '08:00'}
                            onChange={e => updatePost(index, 'g', e.target.value)}
                            className="crm-input text-xs font-mono"
                          />
                        </td>
                        <td>
                          <textarea 
                            value={p.notes || ''}
                            placeholder="Giao việc/Ghi chú..."
                            onChange={e => updatePost(index, 'notes', e.target.value)}
                            className="crm-textarea text-xs"
                          />
                        </td>
                        <td className="text-center">
                          <button onClick={() => deletePost(index, p.n)} className="p-2 text-red-400 hover:text-red-500 bg-red-950/20 hover:bg-red-950/40 rounded-lg transition-all border border-red-900/30">
                            <Trash2 style={{width:14,height:14}}/>
                          </button>
                        </td>
                      </tr>
                    );
                  })}
              </tbody>
            </table>
          </div>
        )}
      </div>
    );
  };

  const renderKpiTracker = () => {
    const updateKpi = (weekIdx, col, val) => {
      const updated = { ...kpiData };
      if (!updated[weekIdx]) updated[weekIdx] = {};
      updated[weekIdx][col] = val;
      setKpiData(updated);
      localSave('kpi', updated);
      syncWithServer(null, null, updated, null);
    };

    const updateBh = (idx, val) => {
      const updated = { ...brandHealthData };
      updated[idx] = parseInt(val) || 0;
      setBrandHealthData(updated);
      localSave('bh', updated);
      syncWithServer(null, null, null, updated);
    };

    // Calculate sum totals
    let sumKpi = { posted: 0, reach: 0, fol: 0, eng: 0, lead: 0, deal: 0 };
    let reachArr = [], engArr = [];
    KPI_WEEKS.forEach((w, wi) => {
      const r = kpiData[wi] || {};
      sumKpi.posted += parseInt(r.posted) || 0;
      sumKpi.fol += parseInt(r.fol) || 0;
      sumKpi.lead += parseInt(r.lead) || 0;
      sumKpi.deal += parseInt(r.deal) || 0;
      if (parseInt(r.reach)) reachArr.push(parseInt(r.reach));
      if (parseInt(r.eng)) engArr.push(parseInt(r.eng));
    });
    
    const avgReach = reachArr.length ? Math.round(reachArr.reduce((x, y) => x + y, 0) / reachArr.length) : '–';
    const avgEng = engArr.length ? Math.round(engArr.reduce((x, y) => x + y, 0) / engArr.length) : '–';

    return (
      <div className="space-y-6">
        <div className="card-glass p-6">
          <h3 className="text-lg font-bold text-amber-500 mb-4 flex items-center gap-2">
            <LineChart style={{width:18,height:18}}/> Báo cáo kết quả KPI hàng tuần
          </h3>
          <div className="crm-table-container custom-scrollbar">
            <table className="crm-table">
              <thead>
                <tr>
                  <th>Tuần</th>
                  <th style={{width: 100}}>Bài (KH)</th>
                  <th style={{width: 120}}>Đã đăng</th>
                  <th style={{width: 130}}>Reach TB</th>
                  <th style={{width: 130}}>Follower +</th>
                  <th style={{width: 130}}>Engage TB</th>
                  <th style={{width: 130}}>Leads</th>
                  <th style={{width: 130}}>Deal</th>
                </tr>
              </thead>
              <tbody>
                {KPI_WEEKS.map((w, wi) => (
                  <tr key={wi} className={w[2]}>
                    <td className="font-bold text-slate-200 text-xs">{w[0]}</td>
                    <td className="text-slate-500 font-mono text-xs text-center">{w[1]}</td>
                    {KPI_COLS.map(c => (
                      <td key={c}>
                        <input 
                          type="number" 
                          min="0"
                          value={(kpiData[wi] && kpiData[wi][c]) || ''}
                          onChange={e => updateKpi(wi, c, e.target.value)}
                          className="crm-input text-xs"
                        />
                      </td>
                    ))}
                  </tr>
                ))}
                <tr className="bg-slate-950 font-black text-amber-500 border-t-2 border-slate-800">
                  <td className="font-bold">TỔNG CỘNG</td>
                  <td className="text-center font-mono text-xs">72</td>
                  <td className="text-center font-mono text-xs">{sumKpi.posted}</td>
                  <td className="text-center font-mono text-xs">{avgReach}</td>
                  <td className="text-center font-mono text-xs">{sumKpi.fol}</td>
                  <td className="text-center font-mono text-xs">{avgEng}</td>
                  <td className="text-center font-mono text-xs">{sumKpi.lead}</td>
                  <td className="text-center font-mono text-xs">{sumKpi.deal}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>

        {/* Brand Health tracker */}
        <div className="card-glass p-6">
          <h3 className="text-lg font-bold text-indigo-400 mb-4 flex items-center gap-2">
            <Award style={{width:18,height:18}}/> Brand Health Index (Sức khỏe thương hiệu 90 ngày)
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {BRAND_HEALTH.map((x, i) => {
              const v = brandHealthData[i] || 0;
              const pct = Math.min(100, Math.round(v / x[2] * 100));

              return (
                <div key={i} className="p-4 bg-slate-950/40 rounded-xl border border-slate-800/60 flex items-center justify-between gap-4">
                  <div className="flex-1">
                    <h5 className="font-bold text-slate-100 text-sm">{x[0]}</h5>
                    <p className="text-xs text-slate-400 mb-2">{x[1]}</p>
                    <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden border border-slate-800">
                      <div className="bg-indigo-500 h-full transition-all duration-300" style={{width: `${pct}%`}}/>
                    </div>
                    <span className="text-[10px] text-slate-500 block mt-1">
                      Mục tiêu: <b className="text-amber-500">{x[2]}</b> · Tiến độ: <b className="text-indigo-400">{pct}%</b>
                    </span>
                  </div>
                  <input 
                    type="number" 
                    min="0"
                    value={v || ''}
                    onChange={e => updateBh(i, e.target.value)}
                    className="crm-input font-bold text-sm text-center focus:border-indigo-500"
                    style={{width: 80, height: 42}}
                  />
                </div>
              );
            })}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="flex-1 overflow-y-auto p-6 md:p-8 space-y-6" style={{background: 'var(--slate-950)'}}>
      <div className="flex justify-between items-center border-b border-slate-800/60 pb-4">
        <div>
          <span className="text-xs font-mono text-amber-500 uppercase tracking-widest">Phân hệ Marketing</span>
          <h2 className="text-2xl font-black text-slate-100 mt-1 uppercase" style={{fontFamily:"'Be Vietnam Pro',sans-serif"}}>
            {tab === 'tongQuan' && '00 · Tổng quan Dự Án'}
            {tab === 'dinhVi' && '01 · Định vị Storyteller'}
            {tab === 'keHoach90n' && '02 · Kế hoạch 90N'}
            {tab === 'pillars' && '03 · 5 Pillars nội dung'}
            {tab === 'lichDangBai' && '04 · Lịch đăng bài CRM'}
            {tab === 'storyBank' && '05 · Story Bank ý tưởng'}
            {tab === 'visual' && '06 · Visual Concept'}
            {tab === 'kpiTracker' && '07 · KPI Tracker'}
          </h2>
        </div>
      </div>

      {tab === 'tongQuan' && renderOverview()}
      {tab === 'dinhVi' && (
        <div className="grid grid-cols-1 gap-6">
          {renderPositioning()}
          {renderPlan()}
        </div>
      )}
      {tab === 'keHoach90n' && renderPlan()}
      {tab === 'pillars' && renderPillars()}
      {tab === 'lichDangBai' && renderSchedule()}
      {tab === 'storyBank' && renderStoryBank()}
      {tab === 'visual' && renderVisual()}
      {tab === 'kpiTracker' && renderKpiTracker()}
    </div>
  );
}
