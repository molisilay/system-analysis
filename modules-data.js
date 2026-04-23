const MODULES = [
  {
    id:'p0', phase:0, pct:0, fillCls:'fill-p',
    title:'資料治理字典',
    sub:'三本字典尚未定義（組織工作，非技術工作）',
    gap:'設備編碼規則、備品料號對應、故障原因碼 L1/L2（80~120 條）',
    done:[],
    partial:[],
    missing:[
      '設備編碼規則：SITE-LINE-TYPE-SEQ（如 TN-A1-PMP-0023）',
      '備品編碼規則：CAT-SUBCAT-SEQ（如 BRG-DEEP-00128）',
      '故障原因碼字典 L1（MEC / ELE / HYD / CTL / EXT）',
      '故障原因碼字典 L2：細分根因，預估 80~120 條',
      '單位/狀態/工時字典統一',
      '角色組織盤點與主資料責任歸屬確認',
    ],
    steps:[
      { name:'Step 1 · 自行盤點：整理三本字典草稿', status:'next',
        desc:'這步完全不需要寫程式。先開一個 Excel，三個工作表分別整理「設備編碼」「備品編碼」「故障原因碼」的草稿，再找相關人員確認，最後才交給 IT 建進系統。',
        tasks:[
          {p:'p-c',t:'【字典1 設備編碼】列出公司所有場域/廠區名稱，各定一個 2~3 字母代碼'},
          {p:'p-c',t:'【字典1 設備編碼】列出每個場域的區域/產線，各定一個代碼'},
          {p:'p-c',t:'【字典1 設備編碼】列出所有設備種類（泵浦/馬達/壓縮機…），各定一個 3 字母代碼'},
          {p:'p-c',t:'【字典1 設備編碼】把現有所有設備逐一填上新編碼（格式：場域-區域-類型-流水號，如 TN-A1-PMP-0001）'},
          {p:'p-c',t:'【字典2 備品編碼】列出倉庫裡所有備品，分大類（軸承/封件/皮帶…）與子類，各定代碼'},
          {p:'p-c',t:'【字典2 備品編碼】若公司有 ERP，對照 ERP 料號建立映射，不要另立一套'},
          {p:'p-c',t:'【字典3 故障原因碼】請 2~3 位資深維修工程師，把過去最常遇到的故障原因寫出來'},
          {p:'p-c',t:'【字典3 故障原因碼】對照 L1 大類分類：MEC(機械) / ELE(電氣) / HYD(液壓) / CTL(控制) / EXT(外部)'},
          {p:'p-h',t:'【字典3 故障原因碼】L2 細分根因（目標 60~100 條，如 MEC-WEAR=磨耗、ELE-SHORT=短路）'},
          {p:'p-h',t:'三本字典草稿完成後，開一次跨部門確認會（維修主管 + 倉管 + 採購），約 2~3 小時'},
        ],
        note:{type:'info',text:'這步完全是文書整理工作，不需要 IT 或工程師。建議用 Excel 一個工作表一張字典，完成後發給相關人確認。格式對了，後面所有模組的資料才有意義。'}
      },
      { name:'Step 2 · 請 IT 統一建檔並發布', status:'plan',
        desc:'字典草稿確認後，交給 IT 部門正式建入系統，並以公司文件形式發布，全公司從某日起統一使用這套編碼。',
        tasks:[
          {p:'p-c',t:'IT 將三本字典內容建入系統（設備類型下拉、備品大類下拉、故障原因碼下拉）'},
          {p:'p-c',t:'以公司正式文件（通知單/SOP）發布：「自 XX 日起，所有設備/備品/故障記錄統一使用此編碼」'},
          {p:'p-h',t:'舊有設備資料保留「舊編碼」欄位作為過渡期對照，不直接刪除'},
          {p:'p-h',t:'將現有設備逐一在系統中補上新編碼（可分批進行，優先 A 級關鍵設備）'},
          {p:'p-h',t:'確認各部門負責人了解新編碼規則，後續新增設備/備品依規則自行填寫'},
          {p:'p-m',t:'三個月後回顧：有沒有遺漏的設備類型或故障原因碼需要補充'},
        ],
        note:{type:'warn',text:'字典一旦發布就盡量不要大改，因為後續所有工單、點檢紀錄都會用這套編碼。若後來發現缺漏，只能「新增」條目，不能修改或刪除已在使用中的代碼。'}
      },
      { name:'Step 3 · 主資料標準化：確認各類資料的唯一來源', status:'plan',
        desc:'每種資料只能有一個系統是「標準版本」，其他系統統一從這裡同步，避免多個系統各自維護同一份資料、造成資料不一致的問題。',
        tasks:[
          {p:'p-h',t:'設備主檔 → 以本系統為標準，所有設備異動（新增/修改/停用）統一在本系統操作'},
          {p:'p-h',t:'備品料號 → 以 ERP 為標準，本系統從 ERP 讀取，不在本系統另外維護料號'},
          {p:'p-h',t:'供應商資料 → 以 ERP 為標準，本系統從 ERP 讀取'},
          {p:'p-h',t:'員工/組織資料 → 以 HR 系統為標準，本系統從 HR 同步，不另外維護人員清單'},
          {p:'p-m',t:'庫存數量 → 本系統與倉庫現場同步；若公司有 WMS，則以 WMS 數字為標準'},
        ],
        note:{type:'info',text:'各類資料的標準來源確認後，日後只要在標準系統修改，其他系統自動同步，不會出現兩個系統顯示不同資料的情況。'}
      },
    ],
    summary:{
      title:'為什麼要先做這三本字典？',
      sections:[
        {
          heading:'沒有字典，資料會「各說各話」',
          body:'如果沒有統一的命名規則，同一台設備在不同部門可能叫不同的名字——維修部門叫「A1三號泵」，採購叫「泵浦#3」，ERP 裡叫「P-003」。三個名字說的是同一台機器，但系統無法自動對應，所有統計和分析都會出錯。',
        },
        {
          heading:'字典是所有後續模組的地基',
          body:'設備編碼決定了每台機器的「身分證號」；備品編碼讓領料、補貨、成本計算能自動串接；故障原因碼讓工單資料可以被統計分析，找出「最常壞的原因」。這三本字典沒有定好，後面不管做多少功能，資料都是散的、無法累積。',
        },
        {
          heading:'現在做比以後改容易 100 倍',
          body:'系統上線後，工單、點檢、採購資料都會用這套編碼記錄。如果上線後才發現編碼有問題，要改的不只是設定，而是所有已經存在的歷史資料。現在花 2~4 週把字典定好，可以省掉未來幾個月的資料清理工作。',
        },
        {
          heading:'這不是技術工作，是管理決策',
          body:'定字典不需要工程師，需要的是「懂設備的人」和「有權拍板的人」坐在一起做決定。IT 只負責把決定好的字典建進系統。所以這件事不能等 IT，要由維修主管或管理層主動推動。',
        },
      ]
    },
  },
  {
    id:'m4', phase:1, pct:85, fillCls:'fill-g',
    title:'M4 · 點檢管理 (Daily Inspection)',
    sub:'現有系統核心強項，功能最完整',
    gap:'語音/影片上傳、巡檢路線規劃、標準上下限比對',
    done:[
      {t:'QR Code 掃碼開單/點檢（html5-qrcode）',                              loc:'/inspection/execute/:id',    locLabel:'巡檢執行頁'},
      {t:'多模板合併檢點（同機台多模板，按模板分組顯示）',                        loc:'/inspection/execute/:id',    locLabel:'巡檢執行頁'},
      {t:'異常強制拍照（前後端雙重驗證，fail 必填 photoUrl）',                   loc:'/inspection/execute/:id',    locLabel:'巡檢執行頁'},
      {t:'離線填報（IndexedDB 四個 store：tasks / checkpoints / sync_queue / photos）', loc:'/frontline',          locLabel:'現場作業首頁'},
      {t:'離線同步佇列（最多重試 5 次，失敗可手動重試）',                         loc:'/frontline',                 locLabel:'現場作業首頁'},
      {t:'網路恢復自動 flush queue，toast 同步狀態提示',                         loc:'/frontline',                 locLabel:'現場作業首頁'},
      {t:'異常自動轉工單（setImmediate 非同步，不阻塞 API）',                    loc:'後端自動',                    locLabel:'後端背景執行'},
      {t:'逾期任務自動檢查（node-cron，每小時 :30 分）',                         loc:'後端自動',                    locLabel:'後端排程'},
      {t:'巡檢歷史查詢',                                                         loc:'/inspection-history',        locLabel:'巡檢歷史頁'},
      {t:'任務看板（支援篩選、狀態追蹤）',                                        loc:'/tasks',                     locLabel:'任務看板'},
      {t:'手動批量任務生成（idempotencyHash 去重）',                              loc:'/task-schedule',             locLabel:'任務排程管理'},
      {t:'多模板合併任務（同機台同天同頻率合併為一個任務）',                       loc:'/task-schedule',             locLabel:'任務排程管理'},
      {t:'PWA Service Worker（今日任務 StaleWhileRevalidate 8小時快取）',         loc:'系統層',                     locLabel:'PWA 離線支援'},
      {t:'班表查詢',                                                              loc:'/my-schedule',               locLabel:'我的班表'},
      {t:'現場作業首頁（今日任務 / 我的工單 / 班表）',                            loc:'/frontline',                 locLabel:'現場作業首頁'},
      {t:'照片壓縮 + 浮水印（日期/時間/位置/使用者）',                            loc:'/inspection/execute/:id',    locLabel:'巡檢執行頁'},
    ],
    partial:[
      {t:'多媒體記錄：有拍照，無語音/影片上傳',  loc:'/inspection/execute/:id', locLabel:'巡檢執行頁'},
      {t:'任務排程：有週期點檢，無累計時數觸發',  loc:'/task-schedule',          locLabel:'任務排程管理'},
    ],
    missing:[
      '語音備註（ASR → 文字，現場免打字）',
      '影片上傳（複雜異常記錄）',
      '巡檢路線規劃（設定最佳巡檢順序）',
      '標準上下限數值比對（測量值 vs 標準值，自動判斷正常/異常）',
    ],
    steps:[
      { name:'Step 1 · 標準上下限比對', status:'next',
        desc:'在檢點項目上加入「標準值/上限/下限」欄位，巡檢時輸入測量值，系統自動比對並標記異常（紅色），直接減少人工判斷錯誤。',
        tasks:[
          {p:'p-h',t:'InspectionItem 資料表加入 stdValue / upperLimit / lowerLimit / unit 欄位', loc:'server/models/InspectionItem', locLabel:'後端模型',
            explain:`**白話解釋：幫每個檢點項目加上「標準值、上限、下限、單位」四個欄位**

**現在的問題：**
點檢表上只有「正常 / 異常」打勾，現場人員憑眼睛和經驗判斷，主觀又容易出錯。

**加了這四個欄位後：**

| 檢點項目 | 標準值 | 下限 | 上限 | 單位 | 量到的值 | 結果 |
|---------|-------|------|------|------|---------|------|
| 油壓 | 5.0 | 4.5 | 5.5 | bar | 6.2 | 🔴 自動標紅 |
| 馬達溫度 | 60 | — | 80 | °C | 75 | 🟢 正常 |

**好處：**
- 現場人員只要輸入數字，不用判斷
- 超過上下限系統自動標紅並強制填備註
- 之後做報表、分析趨勢有真實數據可用

「InspectionItem 資料表」= 存「檢點項目」的資料庫表格。意思是要在資料庫結構上新增這四欄，之後前端網頁才能顯示這些欄位給使用者填。`
          },
          {p:'p-h',t:'前端點檢表加入數值輸入框，超出範圍自動標紅並強制填備註', loc:'/inspection/execute/:id', locLabel:'巡檢執行頁'},
          {p:'p-m',t:'模板管理頁加入標準值設定介面', loc:'/templates', locLabel:'檢點模板管理'},
        ],
        note:{type:'ok',text:'難度低，現有點檢表 UI 加欄位即可，後端也只需在 Checkpoint 存入 measuredValue。預估工時 3~5 天。'}
      },
      { name:'Step 2 · 語音備註（Whisper API）', status:'plan',
        desc:'點檢填寫時加入「語音錄製」按鈕，錄音後送 Whisper API 轉文字，自動填入備註欄。解決現場戴手套打字困難的痛點。',
        tasks:[
          {p:'p-h',t:'前端錄音元件（MediaRecorder API）', loc:'/inspection/execute/:id', locLabel:'巡檢執行頁'},
          {p:'p-h',t:'後端 /api/transcribe 端點（Whisper API 呼叫）', loc:'server/routes/transcribe', locLabel:'後端新端點'},
          {p:'p-m',t:'語音轉文字結果顯示於備註欄，可人工修改後提交', loc:'/inspection/execute/:id', locLabel:'巡檢執行頁'},
          {p:'p-l',t:'支援中英台三語混合'},
        ]
      },
      { name:'Step 3 · 巡檢路線規劃', status:'plan',
        desc:'管理員可設定機台的巡檢順序（拖拽排序），現場人員按路線順序點檢，減少走回頭路。',
        tasks:[
          {p:'p-m',t:'Machine 加入 routeOrder 欄位', loc:'server/models/Machine', locLabel:'後端模型'},
          {p:'p-m',t:'巡檢任務按 routeOrder 排序顯示', loc:'/tasks', locLabel:'任務看板'},
          {p:'p-m',t:'後台拖拽設定路線順序（現有 vue-draggable-plus 可複用）', loc:'/machines', locLabel:'設備清單'},
        ]
      },
      { name:'Step 4 · 影片上傳', status:'plan',
        desc:'異常情況允許錄製短影片上傳（限制 30 秒），存至 Firebase Storage，工單頁可播放。',
        tasks:[
          {p:'p-l',t:'前端影片錄製（MediaRecorder）+ 上傳進度條', loc:'/inspection/execute/:id', locLabel:'巡檢執行頁'},
          {p:'p-l',t:'後端 Firebase Storage 影片存儲路徑規劃', loc:'server/services/storage', locLabel:'後端儲存服務'},
          {p:'p-l',t:'工單詳情頁影片播放器', loc:'/work-orders', locLabel:'工單管理'},
        ],
        note:{type:'info',text:'優先度最低，建議在 Step 1~3 完成後再評估是否需要，現有拍照已能覆蓋大部分場景。'}
      },
    ],
  },
  {
    id:'m3', phase:1, pct:55, fillCls:'fill-b',
    title:'M3 · 維修工單 (Corrective Maintenance)',
    sub:'有基礎工單流程，缺分析能力',
    gap:'故障原因碼（L1/L2）、MTBF/MTTR、工時紀錄、換件紀錄、重複故障分析',
    done:[
      '工單自動建立（點檢任務完成後，偵測異常 Checkpoint 非同步建立）',
      '工單指派（管理員分配給責任人）',
      '狀態流轉：pending_assign → in_progress → pending_confirm → closed',
      '現場人員查看指派給自己的工單（MyWorkOrderView）',
      '現場人員回報完成狀態',
      'AI 智慧建議方案（優先查 RAG 知識庫，無結果才呼叫 AI）',
      '管理員工單列表（篩選、狀態追蹤，WorkOrderView）',
    ],
    partial:[
      '工單詳情：有基本資訊，無工時/換件記錄欄位',
      'AI 建議：有推薦方案文字，無結構化根因分析',
    ],
    missing:[
      '故障原因碼（L1/L2 分類）下拉選單',
      '維修工時記錄（開始時間 / 完成時間 / 實際工時）',
      '換件紀錄（換了哪些備品、數量）',
      'MTBF（平均故障間隔）計算',
      'MTTR（平均修復時間）計算',
      '重複故障分析（同設備同類型故障頻率統計）',
      '5-Why / Fishbone 根因分析輔助',
      '維修外包管理（委外廠商記錄）',
    ],
    steps:[
      { name:'Step 1 · 故障原因碼 L1/L2', status:'block',
        desc:'工單完成時必填故障原因碼（L1 大類 + L2 細因）。此步驟依賴 Phase 0 字典先定義完成，否則只能先預留欄位。',
        tasks:[
          {p:'p-c',t:'【前提】Phase 0 故障原因碼字典完成'},
          {p:'p-c',t:'WorkOrder 資料表加入 failureCodeL1 / failureCodeL2 欄位'},
          {p:'p-c',t:'工單「關閉」動作前強制選擇原因碼（前端驗證）'},
          {p:'p-h',t:'後台原因碼字典管理頁（CRUD，可新增/停用條目）'},
        ],
        note:{type:'warn',text:'此步驟是後續 MTBF/MTTR 與重複故障分析的前提。沒有結構化原因碼，統計就只是噪音。'}
      },
      { name:'Step 2 · 維修工時記錄', status:'next',
        desc:'工單加入工時欄位，記錄維修開始與結束時間，自動計算實際工時（MTTR 計算基礎）。',
        tasks:[
          {p:'p-c',t:'WorkOrder 加入 startedAt / completedAt / laborHours 欄位'},
          {p:'p-h',t:'工單執行頁：「開始維修」按鈕（記錄 startedAt）'},
          {p:'p-h',t:'工單完成頁：自動帶入結束時間，顯示花費工時'},
          {p:'p-m',t:'支援多人工時（一張工單多位維修人員各自記錄）'},
        ],
        note:{type:'ok',text:'難度低，純粹加欄位，預估 2~3 天。完成後就能計算 MTTR。'}
      },
      { name:'Step 3 · 換件紀錄', status:'next',
        desc:'工單完成時記錄更換的零件清單（備品料號 + 數量）。這是 M5 庫存自動扣料的必要前置欄位。',
        tasks:[
          {p:'p-c',t:'建立 WorkOrderPart 子表（workOrderId / partCode / partName / qty）'},
          {p:'p-c',t:'工單完成表單加入「新增換件」區塊（可多筆）'},
          {p:'p-h',t:'目前先手動輸入料號/名稱，M5 完成後改為從備品主檔選取並自動扣庫存'},
        ],
        note:{type:'info',text:'先做「文字版換件記錄」，M5 完成後再升級為從備品主檔選取並自動扣庫存。'}
      },
      { name:'Step 4 · MTBF / MTTR 計算', status:'plan',
        desc:'基於工單歷史資料，按設備計算平均故障間隔（MTBF）與平均修復時間（MTTR）。',
        tasks:[
          {p:'p-h',t:'建立 /api/machines/:id/kpi 端點，回傳該設備的 MTBF / MTTR'},
          {p:'p-h',t:'設備詳情頁顯示 MTBF / MTTR 趨勢（近 12 個月）'},
          {p:'p-m',t:'儀表板加入「重複故障設備排行」（MTBF 最短 TOP 10）'},
        ]
      },
      { name:'Step 5 · 重複故障分析', status:'plan',
        desc:'統計同設備、同原因碼的故障次數，找出「老問題設備」，讓管理員優先處理。',
        tasks:[
          {p:'p-h',t:'/api/reports/repeat-failures：按設備+原因碼分組計數'},
          {p:'p-h',t:'報表頁顯示重複故障排行（可篩選場域、時間區間）'},
          {p:'p-m',t:'AI 輔助根因摘要（讀取重複工單 → 生成改善建議初稿）'},
        ]
      },
    ],
  },
  {
    id:'m1', phase:1, pct:40, fillCls:'fill-b',
    title:'M1 · 設備主檔 (Asset Master)',
    sub:'基礎設備管理存在，缺樹狀結構與完整屬性',
    gap:'父子設備樹狀、零件串聯、設備等級、圖紙/手冊/影片附件、設備編碼規則',
    done:[
      '多公司 / 場域 / 功能區域 / 機台四層結構',
      '設備基本資料（名稱 / 型號 / 廠牌 / 序號 / deviceType）',
      'QR Code 綁定設備（掃碼直達設備頁）',
      '巡檢模板綁定（支援多模板，可排序）',
      '設備列表（MachineListView，支援搜尋篩選）',
      '設備詳情（MachineDetailView，含模板綁定管理）',
      '批量設備匯入（Excel 上傳）',
    ],
    partial:[
      '設備層級：公司/場域/功能區域/設備（4層，尚無子設備/零件層）',
    ],
    missing:[
      '設備樹狀（父設備 → 子系統 → 零件，完整串聯）',
      '設備關鍵等級（A=關鍵 / B=重要 / C=一般）',
      '保固到期日追蹤與提醒',
      '啟用日 / 購入成本 / 折舊資訊',
      '圖紙 / 手冊 / 影片附件管理',
      '設備編碼規則（SITE-LINE-TYPE-SEQ）',
      '設備供應商資訊',
      '設備歷史（完整工單/保養/換件時間軸）',
    ],
    steps:[
      { name:'Step 1 · 設備關鍵等級 A/B/C', status:'next',
        desc:'最簡單先做，加一個欄位，影響後續工單優先度、儀表板顏色顯示、排程優先順序。',
        tasks:[
          {p:'p-h',t:'Machine 加入 criticalityLevel 欄位（A/B/C）'},
          {p:'p-h',t:'設備列表/詳情顯示等級標籤（A=紅、B=黃、C=灰）'},
          {p:'p-h',t:'工單自動帶入設備等級，A 級工單優先顯示'},
          {p:'p-m',t:'儀表板「需關注清單」A 級設備優先排序'},
        ],
        note:{type:'ok',text:'純粹加欄位，預估 1 天。'}
      },
      { name:'Step 2 · 附件管理（圖紙/手冊/影片）', status:'next',
        desc:'設備詳情頁加入附件區塊，支援上傳 PDF/圖片/影片，複用現有 Firebase Storage 邏輯。',
        tasks:[
          {p:'p-h',t:'建立 MachineAttachment 子表（machineId / type / fileName / url）'},
          {p:'p-h',t:'設備詳情頁加入附件 Tab（上傳/預覽/刪除）'},
          {p:'p-m',t:'現場點檢頁加入「查看設備文件」按鈕，可查閱 SOP 手冊'},
        ]
      },
      { name:'Step 3 · 設備樹狀結構（父子關係）', status:'plan',
        desc:'設備可設定「父設備 ID」，形成樹狀層級（整台機器 → 馬達子系統 → 軸承零件）。',
        tasks:[
          {p:'p-c',t:'Machine 加入 parentMachineId 欄位（自關聯）'},
          {p:'p-h',t:'設備詳情頁顯示子設備列表（可新增子設備/零件）'},
          {p:'p-h',t:'設備選擇元件支援樹狀展開'},
          {p:'p-m',t:'設備樹狀總覽頁（可視化展開/收合）'},
        ]
      },
      { name:'Step 4 · 設備履歷時間軸', status:'plan',
        desc:'設備詳情頁加入「設備履歷」Tab，時間軸顯示所有點檢/工單/保養/換件紀錄，方便追溯。',
        tasks:[
          {p:'p-h',t:'/api/machines/:id/history 端點，聚合所有相關事件'},
          {p:'p-h',t:'前端時間軸元件（按日期倒序）'},
          {p:'p-m',t:'支援篩選（只看故障 / 只看保養 / 只看換件）'},
        ],
        note:{type:'ok',text:'不需新資料，整合現有 Task / WorkOrder / Checkpoint 資料即可。預估 3~5 天。'}
      },
      { name:'Step 5 · 保固/購入資訊', status:'plan',
        desc:'設備加入保固到期日、購入日、成本欄位，臨近到期自動提醒。',
        tasks:[
          {p:'p-m',t:'Machine 加入 purchaseDate / warrantyExpiry / purchaseCost 欄位'},
          {p:'p-m',t:'儀表板「設備保固到期提醒」（30天內到期標示）'},
        ]
      },
    ],
  },
  {
    id:'m2', phase:1, pct:15, fillCls:'fill-y',
    title:'M2 · 保養管理 PM (Preventive Maintenance)',
    sub:'只有排程框架，PM 工單獨立流程完全缺失',
    gap:'年度/月度保養計畫、累計時數觸發、保養工單（獨立於維修）、保養達成率',
    done:[
      '任務排程管理（InspectionTaskScheduleView，週期點檢排程）',
      '排程表單（InspectionScheduleFormView，新增/編輯排程）',
      '批量任務生成（UnifiedScheduleModal，手動批量建立點檢任務）',
    ],
    partial:[
      '排程功能：有週期點檢，無「保養計畫」概念（PM ≠ 點檢）',
    ],
    missing:[
      '年度/月度保養計畫建立',
      'PM 保養工單（獨立於維修工單，有標準值記錄欄位）',
      '累計時數/里程觸發排程（非固定週期）',
      '保養項目勾選（含標準值記錄）',
      '保養後狀態確認流程',
      '保養達成率統計',
      '未完成保養追蹤（獨立於點檢逾期）',
      '下次保養日期預測顯示',
    ],
    steps:[
      { name:'Step 1 · PM 工單資料模型設計', status:'next',
        desc:'定義「保養工單」與現有「維修工單」的區別：PM 工單有保養計畫觸發、有標準值記錄、有保養後狀態確認，與 CM 工單完全獨立。',
        tasks:[
          {p:'p-c',t:'建立 MaintenancePlan 資料表（machineId / planName / type / interval / unit）'},
          {p:'p-c',t:'建立 MaintenanceOrder 資料表（planId / status / scheduledDate / completedDate）'},
          {p:'p-c',t:'建立 MaintenanceCheckItem 子表（保養步驟：描述/標準值/測量值/結果）'},
          {p:'p-h',t:'區分 orderType: PM（預防保養）vs CM（矯正維修）'},
        ]
      },
      { name:'Step 2 · 保養計畫 CRUD', status:'plan',
        desc:'後台建立設備保養計畫，設定週期（天/週/月）或累計時數觸發，到期自動生成 PM 工單。',
        tasks:[
          {p:'p-h',t:'後台保養計畫管理頁（列表/新增/編輯/停用）'},
          {p:'p-h',t:'支援週期觸發（固定天數）與時數觸發（累計運轉時數達到閾值）'},
          {p:'p-h',t:'自動生成 PM 工單（node-cron 每日 00:00 檢查到期計畫）'},
          {p:'p-m',t:'年度保養計畫視圖（甘特圖式，按月顯示計劃 vs 實際）'},
        ]
      },
      { name:'Step 3 · PM 工單執行介面', status:'plan',
        desc:'現場人員執行 PM 工單時，有結構化保養步驟清單，可逐項勾選並填入測量值。',
        tasks:[
          {p:'p-h',t:'行動端 PM 工單執行頁（步驟清單 + 勾選 + 測量值輸入）'},
          {p:'p-h',t:'標準值比對（測量值超出範圍自動標紅）'},
          {p:'p-h',t:'保養後狀態確認（正常/需追蹤/建立維修工單）'},
          {p:'p-m',t:'保養完成後自動更新設備的「下次保養日期」'},
        ]
      },
      { name:'Step 4 · 保養達成率統計', status:'plan',
        desc:'按設備/場域/月份統計 PM 計畫完成率，顯示於主管儀表板。',
        tasks:[
          {p:'p-h',t:'/api/maintenance/achievement-rate：計算計畫/實際完成數'},
          {p:'p-m',t:'儀表板加入「保養達成率」卡片'},
          {p:'p-m',t:'逾期未完成 PM 工單顯示在「需關注清單」'},
        ]
      },
    ],
  },
  {
    id:'m5', phase:1, pct:0, fillCls:'fill-r',
    title:'M5 · 備品/庫存 MRO (Spare Parts)',
    sub:'完全缺失 · 整個計畫最大優先缺口',
    gap:'備品主檔、安全庫存、領料/退料、工單自動扣料、補貨建議、呆滯料分析',
    done:[],
    partial:[],
    missing:[
      '備品主檔（料號/名稱/規格/單位/替代料/對應設備）',
      '安全庫存 / 最低庫存設定',
      '倉位管理（儲位/區域）',
      '批號/序號/效期管理',
      '領料流程（維修工程師申請 → 倉管審核 → 發料）',
      '退料流程（未用料退回）',
      '借料流程（跨廠調撥）',
      '工單自動扣料（換件紀錄連動庫存）',
      '補貨建議（AI 輔助動態優先順序）',
      '缺料預警（低於安全庫存自動推播）',
      '呆滯料分析',
      '高周轉料分析',
      '庫存盤點功能',
      '備品關鍵件清單（A 級設備專用備品標記）',
    ],
    steps:[
      { name:'Step 1 · 備品主檔建立', status:'next',
        desc:'這是整個 M5 的基礎。先把備品基本資料建立起來，不需要 ERP 對接，先手動匯入。',
        tasks:[
          {p:'p-c',t:'建立 SparePart 資料表（partCode / name / spec / unit / minStock / safeStock / currentStock）'},
          {p:'p-c',t:'建立 SparePartMachine 關聯表（哪些設備用哪些備品）'},
          {p:'p-c',t:'建立 SparePartAlternative 替代料表'},
          {p:'p-h',t:'後台備品主檔 CRUD 頁面（含 Excel 批量匯入）'},
          {p:'p-h',t:'備品列表頁（搜尋/篩選/庫存狀態顯示）'},
        ],
        note:{type:'warn',text:'備品主檔是所有後續功能的基礎。建立前先確認 Phase 0 備品編碼字典已完成，否則匯入後還要全部改料號。'}
      },
      { name:'Step 2 · 庫存現況管理', status:'plan',
        desc:'記錄現有庫存數量、倉位，建立初始庫存盤點。',
        tasks:[
          {p:'p-c',t:'建立 StockLocation 倉位表（warehouse / zone / shelf）'},
          {p:'p-c',t:'建立 StockTransaction 異動紀錄表（in/out/adjust/transfer）'},
          {p:'p-h',t:'倉管庫存盤點介面（輸入現有數量 → 建立盤點紀錄）'},
          {p:'p-h',t:'庫存台帳（每筆異動歷史，可追溯）'},
        ]
      },
      { name:'Step 3 · 領料/退料流程', status:'plan',
        desc:'維修工程師申請領料，倉管確認發料，庫存自動扣除。',
        tasks:[
          {p:'p-c',t:'建立 MaterialRequest 領料申請表（requesterId / parts / workOrderId）'},
          {p:'p-c',t:'領料審核流程（倉管確認 → 發料 → 庫存扣除）'},
          {p:'p-h',t:'行動端領料申請頁（從工單直接申請備品）'},
          {p:'p-h',t:'退料流程（未使用備品退回庫存）'},
        ]
      },
      { name:'Step 4 · 工單自動扣料', status:'plan',
        desc:'工單換件紀錄完成後，自動從庫存扣除對應備品數量，觸發低庫存檢查。',
        tasks:[
          {p:'p-c',t:'WorkOrderPart → SparePart 庫存扣除邏輯（完成工單時觸發）'},
          {p:'p-c',t:'庫存低於安全庫存時自動推播通知（倉管 + 採購）'},
          {p:'p-h',t:'工單詳情顯示此工單消耗的備品成本'},
        ],
        note:{type:'ok',text:'此步驟完成後，「故障→工單→換件→扣庫存」完整鏈跑通，可量化每次維修的備品成本。'}
      },
      { name:'Step 5 · 補貨建議 & 缺料預警', status:'plan',
        desc:'根據歷史耗用速度與安全庫存，動態計算各備品補貨緊急程度，並在缺料時推播預警。',
        tasks:[
          {p:'p-h',t:'建立補貨建議演算法（耗用速度 × 交期 → 建議補貨時機）'},
          {p:'p-h',t:'缺料影響分析（哪些在修工單因缺料卡住）'},
          {p:'p-m',t:'AI 輔助：結合故障機率預測備品需求'},
          {p:'p-m',t:'一鍵建立補貨申請（串接 M6 採購流程）'},
        ]
      },
      { name:'Step 6 · 呆滯料 / 庫存分析報表', status:'plan',
        desc:'找出超過一定期間沒有使用的備品（呆滯料），釋放資金；找出高周轉備品，確保安全庫存充足。',
        tasks:[
          {p:'p-m',t:'呆滯料清單（超過 N 個月沒出庫的備品）'},
          {p:'p-m',t:'高周轉備品排行（消耗最快的 TOP 20）'},
          {p:'p-m',t:'備品周轉率統計報表'},
        ]
      },
    ],
  },
  {
    id:'perm', phase:2, pct:70, fillCls:'fill-g',
    title:'權限與多租戶',
    sub:'RBAC 完整，ABAC 與簽核引擎缺失',
    gap:'ABAC 屬性型權限、串聯/並聯簽核引擎、代理人機制',
    done:[
      '多公司（Company）管理（requiresCompanyAdmin）',
      '多場域（Site）管理（requiresAdmin）',
      '使用者帳號管理（UserListView）',
      'RBAC 自訂角色（RoleListView，可自定義角色名稱與權限組合）',
      '場域資料隔離（非 Super Admin 只看自己場域）',
      'JWT Token 認證 + 刷新機制',
      'Hard Delete 審計日誌（DeletionLogView，刪除前驗證關聯）',
      '管理員/現場人員視角切換（admin/field 模式）',
      'Super Admin 跨全域查看',
    ],
    partial:[
      '角色設計：Super Admin / CompanyAdmin / Admin / Frontline（4層，尚無倉管/採購角色）',
    ],
    missing:[
      'ABAC 屬性型存取控制（如倉管只能看自己管的倉庫）',
      '倉管角色（M5 需要）',
      '採購角色（M6 需要）',
      '維修工程師角色（M3 需要更細緻授權）',
      '串聯/並聯/條件式簽核引擎',
      '代理人機制（主管不在時自動轉給代理）',
      '簽核時限與催辦',
      '退簽 / 撤回 / 加簽機制',
      '稽核軌跡（所有簽核動作記錄）',
    ],
    steps:[
      { name:'Step 1 · 補充缺失角色', status:'next',
        desc:'M5/M6 開發前，先把角色擴充好，確保倉管和採購人員有適當的權限層級。',
        tasks:[
          {p:'p-c',t:'新增 Warehouse（倉管）角色：庫存查詢/發料/入庫/盤點'},
          {p:'p-c',t:'新增 Procurement（採購）角色：採購申請/供應商/到貨驗收'},
          {p:'p-h',t:'新增 Technician（維修工程師）角色：接工單/換件/領料'},
          {p:'p-h',t:'現有 Admin 選單依角色動態顯示相關模組'},
        ]
      },
      { name:'Step 2 · ABAC 屬性型存取', status:'plan',
        desc:'角色決定「能做什麼操作」，屬性決定「能看哪些資料」。例如倉管只能看自己負責的倉庫庫存。',
        tasks:[
          {p:'p-h',t:'User 資料表加入 assignedWarehouseIds / assignedSiteIds 屬性'},
          {p:'p-h',t:'API middleware 加入 ABAC 過濾（查詢時自動加入屬性條件）'},
          {p:'p-m',t:'後台「使用者屬性設定」頁（指派倉庫/場域）'},
        ]
      },
      { name:'Step 3 · 簽核引擎', status:'plan',
        desc:'M6 採購申請需要核准流程。先做串聯簽核最常用場景，再擴充並聯與條件式。',
        tasks:[
          {p:'p-h',t:'建立 ApprovalFlow 資料表（flowType / steps / currentStep / status）'},
          {p:'p-h',t:'建立 ApprovalRecord 簽核紀錄表（審核人 / 動作 / 時間 / 意見）'},
          {p:'p-h',t:'串聯簽核（A→B→C 順序核准）'},
          {p:'p-m',t:'條件式簽核（採購金額 < 1萬 只需一層，> 1萬 需兩層）'},
          {p:'p-m',t:'代理人機制（主管請假時自動轉給代理人）'},
          {p:'p-l',t:'並聯簽核（多人同時審核，全部通過才算）'},
          {p:'p-l',t:'催辦機制（超時自動發 Email/通知）'},
        ]
      },
    ],
  },
  {
    id:'m8', phase:2, pct:40, fillCls:'fill-b',
    title:'M8 · 主管儀表板 (Executive Dashboard)',
    sub:'基礎統計完整，缺乏完整 KPI 與鑽取能力',
    gap:'設備稼動率、MTBF/MTTR、停機時數、維修成本、設備健康分數、廠別鑽取',
    done:[
      '4 個統計卡片（完成率 / 逾期數 / 異常數 / 待處理工單）',
      '趨勢圖（折線：完成率；長條：異常數）',
      '支援今日/本週/本月切換',
      '需關注清單（逾期任務 + 未結工單）',
      '場域篩選（Super Admin 可選全域或特定場域）',
      '月/季/年報表分析頁（ReportsView）',
      'AI 報表自動生成（OpenAI/Gemini API）',
      'AI 報表範本辨識（上傳 Excel/PDF，AI 自動欄位對應）',
      '批次報表匯出（多設備×多月份，ZIP 下載）',
    ],
    partial:[
      '報表分析：有點檢相關數據，缺備品/工單成本/MTBF 等維修 KPI',
    ],
    missing:[
      '設備稼動率（OEE）',
      'MTBF / MTTR 指標卡片',
      '停機時數統計',
      '維修成本追蹤（工時成本 + 備品成本）',
      '備品周轉率',
      '缺料影響工單數',
      '保養達成率 KPI',
      '重複故障設備排行',
      '設備健康分數（0~100）',
      '廠別→產線→設備逐層鑽取',
      '各場域 KPI 比較',
      '主管每日摘要（Email / 推播）',
    ],
    steps:[
      { name:'Step 1 · MTBF/MTTR 卡片（依賴 M3 Step 4）', status:'plan',
        desc:'M3 工時記錄完成後，儀表板才能顯示有意義的 MTBF/MTTR 數值。',
        tasks:[
          {p:'p-h',t:'儀表板加入 MTBF / MTTR 統計卡片'},
          {p:'p-h',t:'可按場域/設備類型篩選'},
          {p:'p-h',t:'與上月比較（箭頭顯示趨勢）'},
        ]
      },
      { name:'Step 2 · 維修成本追蹤（依賴 M3+M5）', status:'plan',
        desc:'工單工時成本 + 備品耗用成本 = 單次維修總成本，匯總後可看各設備/產線的維修成本排行。',
        tasks:[
          {p:'p-h',t:'工單成本計算（工時×人工單價 + 備品成本）'},
          {p:'p-h',t:'維修成本排行榜（設備 / 產線 / 月份）'},
          {p:'p-m',t:'年度維修成本趨勢圖'},
        ]
      },
      { name:'Step 3 · 廠別→產線→設備鑽取', status:'plan',
        desc:'儀表板支援逐層下鑽，從廠別總覽 → 點選某產線 → 看該線所有設備 KPI。',
        tasks:[
          {p:'p-h',t:'儀表板支援廠別切換（升級為有層級的選擇）'},
          {p:'p-h',t:'點擊統計卡片可鑽入看詳細清單'},
          {p:'p-m',t:'各場域/廠別 KPI 橫向比較視圖'},
        ]
      },
      { name:'Step 4 · 設備健康分數（依賴 M3+M2+M5）', status:'plan',
        desc:'綜合多個維度計算設備健康分數（0~100），供主管快速識別高風險設備。',
        tasks:[
          {p:'p-h',t:'健康分數演算法：故障頻率(40%) + 保養達成率(30%) + 備品消耗(20%) + 工單響應時間(10%)'},
          {p:'p-h',t:'設備列表加入健康分數欄位（紅<40 / 黃40~70 / 綠>70）'},
          {p:'p-m',t:'儀表板「健康分數最低設備 TOP 10」'},
        ]
      },
      { name:'Step 5 · 主管每日摘要', status:'plan',
        desc:'每天早上自動發送摘要 Email/推播：昨日異常、高風險設備、缺料預警、今日優先工單。',
        tasks:[
          {p:'p-m',t:'node-cron 每日 07:30 生成摘要'},
          {p:'p-m',t:'AI 輔助撰寫摘要文字（Claude API）'},
          {p:'p-m',t:'Email + 系統內通知雙管道'},
        ]
      },
    ],
  },
  {
    id:'m6', phase:2, pct:0, fillCls:'fill-r',
    title:'M6 · 採購管理 (Procurement)',
    sub:'完全缺失，依賴 M5 備品庫存先完成',
    gap:'採購申請單、供應商主檔、採購核准流程、到貨驗收、供應商績效',
    done:[],
    partial:[],
    missing:[
      '採購申請單（PR）',
      '採購核准流程（依金額分層審核）',
      '供應商主檔（廠商資料/聯絡/資質）',
      '歷史報價/單價記錄',
      '預期交期管理',
      '緊急採購流程',
      '到貨驗收（品質確認/入庫）',
      '供應商績效評分',
      '維修外包管理（委外廠商）',
      'AI 輔助：長交期零件風險預警',
      'AI 輔助：價格異常提醒',
      'AI 輔助：常用備品補貨預測',
    ],
    steps:[
      { name:'Step 1 · 供應商主檔', status:'plan',
        desc:'建立供應商基本資料，為後續採購申請提供下拉選單。',
        tasks:[
          {p:'p-c',t:'建立 Supplier 資料表（name / contact / leadTimeDays / paymentTerms）'},
          {p:'p-h',t:'後台供應商 CRUD 頁'},
          {p:'p-h',t:'備品主檔加入「預設供應商」與「歷史單價」'},
        ]
      },
      { name:'Step 2 · 採購申請單（PR）', status:'plan',
        desc:'倉管/維修工程師發現缺料時建立採購申請，選擇備品、數量、供應商、緊急程度。',
        tasks:[
          {p:'p-c',t:'建立 PurchaseRequest 資料表（parts / supplierId / urgency / status）'},
          {p:'p-h',t:'採購申請建立頁（可從缺料預警一鍵建立）'},
          {p:'p-h',t:'採購申請列表（篩選：待審核/已核准/已到貨）'},
        ]
      },
      { name:'Step 3 · 採購核准流程（依賴簽核引擎）', status:'plan',
        desc:'採購申請自動進入簽核流程，依金額決定審核層級。',
        tasks:[
          {p:'p-h',t:'採購申請綁定簽核流程（金額條件式分流）'},
          {p:'p-h',t:'核准人收到推播通知'},
          {p:'p-h',t:'退簽時申請人收到通知並可修改後重送'},
        ]
      },
      { name:'Step 4 · 到貨驗收 & 入庫', status:'plan',
        desc:'採購訂單到貨後，倉管執行驗收，通過後自動更新庫存。',
        tasks:[
          {p:'p-h',t:'建立 PurchaseOrder 採購訂單（PR 核准後生成）'},
          {p:'p-h',t:'到貨驗收頁（逐項確認/拍照/標記異常品）'},
          {p:'p-h',t:'驗收通過 → 自動更新 SparePart currentStock'},
        ]
      },
      { name:'Step 5 · 供應商績效評分', status:'plan',
        desc:'按交期準確率、品質合格率、價格穩定性自動計算供應商績效，輔助採購決策。',
        tasks:[
          {p:'p-m',t:'自動計算交期準確率（承諾交期 vs 實際到貨日）'},
          {p:'p-m',t:'品質合格率（驗收異常比例）'},
          {p:'p-m',t:'供應商績效排行報表'},
        ]
      },
    ],
  },
  {
    id:'m00', phase:2, pct:10, fillCls:'fill-y',
    title:'整合層 M00 (ERP/MES/WMS)',
    sub:'只有外部 API，缺正式系統對接',
    gap:'ERP/MES/WMS 對接、ETL 批次同步、主資料管理（MDM）',
    done:[
      '外部 API 管理（ExternalApiView，生成 API Key）',
      'RESTful 端點（任務查詢/巡檢結果提交/工單查詢）',
    ],
    partial:[
      '外部 API：有基本端點，無針對 ERP/MES/WMS 的適配器',
    ],
    missing:[
      'ERP（鼎新/SAP）設備主檔同步',
      'ERP 採購單/會計整合',
      'MES 生產計畫/稼動率讀取',
      'WMS 庫存同步（進出紀錄）',
      'HR 員工/部門/簽核權限同步',
      'SCADA 設備運轉狀態讀取',
      'ETL 批次同步（每日凌晨批次）',
      'CDC 變更擷取（即時鏡像）',
      '主資料管理（MDM）衝突解決機制',
    ],
    steps:[
      { name:'Step 0 · POC 驗證各系統 API 能力', status:'next',
        desc:'在寫任何整合 code 之前，先確認各外部系統有沒有開放 API。ERP 尤其可能是最大障礙。',
        tasks:[
          {p:'p-c',t:'確認 ERP（鼎新/SAP）是否有 REST API 或 Web Service'},
          {p:'p-c',t:'確認 WMS 是否有庫存異動 API'},
          {p:'p-h',t:'確認 MES 稼動率資料擷取方式'},
          {p:'p-h',t:'若無 API：評估 DB 直連 or 檔案交換（CSV/Excel）作為過渡方案'},
        ],
        note:{type:'warn',text:'ERP API 限制是整合層最大風險。這個 POC 必須在 Phase 2 開始前完成，不然整個整合計畫可能要大幅調整。'}
      },
      { name:'Step 1 · 設備主檔單向同步（ERP→本系統）', status:'plan',
        desc:'ERP 是設備主檔的真理來源之一，每日批次同步新增/異動設備到本系統。',
        tasks:[
          {p:'p-h',t:'ETL 腳本：每日 02:00 讀取 ERP 設備異動清單'},
          {p:'p-h',t:'新設備自動建立於本系統（待補充點檢模板）'},
          {p:'p-h',t:'設備資料異動自動更新（型號/廠牌/序號）'},
        ]
      },
      { name:'Step 2 · 庫存同步（本系統↔WMS）', status:'plan',
        desc:'備品領料/入庫在本系統操作，庫存異動同步回 WMS；WMS 有異動時也同步到本系統。',
        tasks:[
          {p:'p-h',t:'本系統發料 → Webhook 通知 WMS 扣庫'},
          {p:'p-h',t:'WMS 入庫完成 → 本系統自動更新 currentStock'},
          {p:'p-m',t:'衝突解決：WMS 為庫存最終真理來源，每日對帳'},
        ]
      },
      { name:'Step 3 · MES 稼動率讀取', status:'plan',
        desc:'從 MES 讀取設備運轉時間與停機記錄，補充儀表板稼動率 KPI。',
        tasks:[
          {p:'p-m',t:'定期讀取 MES 稼動率資料（每小時或每班）'},
          {p:'p-m',t:'對應設備編碼（MES 編碼 ↔ 本系統設備 ID）'},
          {p:'p-m',t:'儀表板稼動率卡片顯示 MES 來源數據'},
        ]
      },
    ],
  },
  {
    id:'m7', phase:3, pct:35, fillCls:'fill-y',
    title:'M7 · AI 智慧助手 (AI Copilot)',
    sub:'知識型+助理型完整，感知層與預測層缺失',
    gap:'Vision AI 異常辨識、語音 ASR 報修、熱像圖分析、預測型 AI（壽命/停機風險）',
    done:[
      'RAG 知識庫（KnowledgeBaseView：PDF/Word 上傳 + Embeddings 儲存）',
      '語意搜尋（Top-K 相似度檢索）',
      'AI 工單建議方案（優先查 RAG，無結果才呼叫 AI，節省成本）',
      'AI 報表生成（OpenAI/Gemini API，分析點檢資料生成圖表與建議）',
      'AI 報表範本辨識（上傳 Excel/PDF/圖片，AI 自動識別欄位結構）',
      '反幻覺機制（強制 RAG 引用來源，無來源回答「不知道」）',
      'API Key 管理（AIAgentSettingsView：OpenAI/Gemini Key 設定）',
    ],
    partial:[
      'AI 助理：有工單推薦方案，無結構化根因分析輔助',
      '知識庫：有語意搜尋，無自動知識萃取（維修紀錄未自動入庫）',
    ],
    missing:[
      'Vision AI：拍照異常辨識（漏油/鏽蝕/裂痕/鬆脫）',
      '語音 ASR 報修（Whisper API，中英台三語）',
      '熱像圖過熱點自動分析',
      '故障風險預測（基於歷史工單+感測器）',
      '零件壽命預測',
      '補貨時間預測',
      '停機風險預測',
      '最佳保養時機建議（動態，非固定週期）',
      'AI 主管每日摘要自動生成',
      '維修工單自動分類（原因碼建議）',
      '維修紀錄自動入知識庫（新工單完成 → 摘要存入 RAG）',
    ],
    steps:[
      { name:'Step 1 · 維修紀錄自動入知識庫', status:'next',
        desc:'工單關閉時，自動將「設備/故障原因/處理方式/換件」摘要存入 RAG 知識庫，讓知識庫越來越豐富，不依賴人工上傳。',
        tasks:[
          {p:'p-h',t:'工單關閉 Hook：自動生成 AI 摘要（Claude API）'},
          {p:'p-h',t:'摘要格式：設備型號 + 原因碼 + 處理步驟 + 使用備品'},
          {p:'p-h',t:'存入 KnowledgeChunk 向量資料庫'},
          {p:'p-m',t:'後台可查看自動入庫的維修知識（可標記品質/刪除低品質條目）'},
        ],
        note:{type:'ok',text:'這是 AI 飛輪效應的關鍵：工單越多 → 知識庫越豐富 → AI 建議越準確。預估 3~5 天。'}
      },
      { name:'Step 2 · 工單原因碼 AI 建議', status:'next',
        desc:'工單建立時，AI 根據故障描述自動推薦 L1/L2 原因碼，減少人工查字典的負擔。',
        tasks:[
          {p:'p-h',t:'工單表單：填入故障描述後，AI 推薦 Top 3 原因碼'},
          {p:'p-h',t:'後端：故障描述 → Claude API → 比對原因碼字典 → 回傳建議'},
          {p:'p-m',t:'準確率追蹤（使用者接受/拒絕 AI 建議，回饋改善）'},
        ]
      },
      { name:'Step 3 · Vision AI 異常辨識', status:'plan',
        desc:'點檢拍照時，照片送 Claude Vision / GPT-4V，AI 自動識別漏油/鏽蝕/裂痕/鬆脫，並建議是否需要立即維修。',
        tasks:[
          {p:'p-h',t:'前端拍照後增加「AI 分析」按鈕'},
          {p:'p-h',t:'後端 /api/vision/analyze：傳入照片 URL → 呼叫 Vision API → 回傳分析結果'},
          {p:'p-h',t:'分析結果顯示於點檢頁（異常類型 + 嚴重度 + 建議動作）'},
          {p:'p-m',t:'高嚴重度自動觸發工單建立'},
        ],
        note:{type:'info',text:'使用 Claude Vision 或 GPT-4V 作為通用視覺模型，不需要自訓模型。'}
      },
      { name:'Step 4 · AI 主管每日摘要', status:'plan',
        desc:'每天早上 AI 自動生成昨日摘要，主管不需要自己查看各頁面。',
        tasks:[
          {p:'p-m',t:'摘要內容：昨日異常摘要 / 高風險設備清單 / 缺料風險 / 今日優先工單'},
          {p:'p-m',t:'Claude API 生成自然語言摘要（繁體中文）'},
          {p:'p-m',t:'Email + 系統內通知雙管道'},
        ]
      },
      { name:'Step 5 · 故障風險預測（長期）', status:'plan',
        desc:'基於歷史工單頻率、感測器異常趨勢，預測設備故障風險。需要 IoT 數據才能效果最佳。',
        tasks:[
          {p:'p-l',t:'無 IoT 版：基於工單歷史頻率 + 保養記錄計算風險分數'},
          {p:'p-l',t:'有 IoT 版：加入振動/溫度/電流趨勢作為預測特徵'},
          {p:'p-l',t:'風險分數閾值觸發提前保養工單'},
        ],
        note:{type:'info',text:'需要至少 6 個月的工單歷史資料才能有意義的預測，不需急於實作。'}
      },
    ],
  },
  {
    id:'iot', phase:3, pct:0, fillCls:'fill-r',
    title:'IoT / 感測器架構',
    sub:'完全缺失，Phase 3 後段實作，先從 1~2 台試點',
    gap:'MQTT/OPC UA/Modbus、TimescaleDB 時序資料、邊緣閘道、設備健康分數',
    done:[],
    partial:[],
    missing:[
      'MQTT Broker 部署',
      'OPC UA / Modbus 協定轉換',
      '邊緣閘道（Industrial PC + Node-RED）',
      'TimescaleDB 時序資料儲存',
      '感測器資料接收 API',
      '即時告警規則引擎',
      '設備健康分數（基於感測器）',
      '振動/溫度/電流/壓力感測器整合',
      '熱像圖接入',
      '秒級原始資料保留（30天）',
      '聚合分鐘/小時資料永久保留',
    ],
    steps:[
      { name:'Step 0 · 試點設備選擇', status:'plan',
        desc:'先挑 1~2 台設備試點，選擇「停機損失最大」或「故障最頻繁」的設備，驗證整個資料流後再複製。',
        tasks:[
          {p:'p-c',t:'選定試點設備（建議：停機損失最大的關鍵設備）'},
          {p:'p-c',t:'評估感測器需求（振動/溫度/電流，基本三件套）'},
          {p:'p-h',t:'硬體採購：感測器 + Industrial PC + 網路'},
          {p:'p-h',t:'確認試點設備的 PLC/SCADA 通訊協定（Modbus / OPC UA）'},
        ],
        note:{type:'warn',text:'不要一次全廠部署。試點 1~2 台，驗證後再複製到 10~20 台同類設備。硬體成本估算：每台設備基本套件約 3~8 萬。'}
      },
      { name:'Step 1 · 邊緣層建置', status:'plan',
        desc:'邊緣閘道負責接收感測器原始資料、協定轉換、邊緣異常偵測，並緩衝上傳到雲端。',
        tasks:[
          {p:'p-h',t:'部署 MQTT Broker（Mosquitto）'},
          {p:'p-h',t:'Node-RED 流程：感測器資料 → 協定轉換 → MQTT 發布'},
          {p:'p-h',t:'邊緣異常偵測（簡單閾值規則：振動 > X → 本地告警）'},
          {p:'p-h',t:'離線緩存（網路中斷時本地存儲，恢復後補傳）'},
        ]
      },
      { name:'Step 2 · 雲端時序資料接收', status:'plan',
        desc:'雲端接收 MQTT 訊息，存入 TimescaleDB 時序資料庫，建立資料保留策略。',
        tasks:[
          {p:'p-h',t:'TimescaleDB 擴充 PostgreSQL（現有 DB 可直接升級）'},
          {p:'p-h',t:'MQTT→TimescaleDB 資料管道（Node.js MQTT client）'},
          {p:'p-h',t:'資料保留策略：秒級 30 天，分鐘級永久'},
          {p:'p-m',t:'感測器資料 API（/api/sensors/:deviceId/readings）'},
        ]
      },
      { name:'Step 3 · 告警規則引擎', status:'plan',
        desc:'設定感測器告警規則（如振動 > 閾值持續 5 分鐘），觸發通知並自動建立工單。',
        tasks:[
          {p:'p-h',t:'Rule Engine：設定設備感測器閾值與告警條件'},
          {p:'p-h',t:'告警觸發 → 推播通知維修工程師'},
          {p:'p-m',t:'嚴重告警自動建立緊急工單'},
          {p:'p-m',t:'設備頁加入感測器即時數值顯示'},
        ]
      },
      { name:'Step 4 · 全廠複製', status:'plan',
        desc:'試點驗證成功後，制定複製計畫，分批導入其他設備。',
        tasks:[
          {p:'p-l',t:'標準化安裝程序文件'},
          {p:'p-l',t:'每批 10~20 台，驗證後再擴展'},
          {p:'p-l',t:'追蹤每批導入後的 MTBF 變化（量化效益）'},
        ]
      },
    ],
  },
];
