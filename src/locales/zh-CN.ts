export default {
  app_name: '简朴',
  troubleshoot: '故障排除',
  fix_disconnect_tips: '连接已断开，请尝试保持手机屏幕亮起或将手机连接 USB 充电。或重新打开应用并刷新页面。',
  failed_connect_ws: '连接已断开，请重新启动应用程序并重试。',
  desktop_notification_need_https: '桌面通知需要安全链接（HTTPS）。',
  use_https_link: '使用HTTPS链接',
  confirm_uninstallation_on_phone: '请在您的手机上确认卸载。',
  fetch_content_automatically: '自动拉取正文内容',
  call: '呼叫',
  call_phone: '打电话',
  device_info: '设备信息',
  basic_info: '基本信息',
  device_name: '设备名称',
  model: '型号',
  device: '设备',
  board: '主板',
  hardware: '硬件',
  brand: '品牌',
  build_fingerprint: '构建指纹',
  system: '系统',
  android_version: 'Android 版本',
  security_patch: '安全补丁',
  bootloader: '引导程序',
  build_number: '构建编号',
  baseband: '基带',
  kernel: '内核',
  java_vm: 'Java 虚拟机',
  opengl_es: 'OpenGL ES',
  uptime: '运行时间',
  battery: '电池',
  health: '健康',
  level: '电量',
  remaining: '剩余',
  power_source: '电源',
  technology: '技术',
  temperature: '温度',
  voltage: '电压',
  capacity: '容量',
  battery_health: {
    '1': '未知',
    '2': '良好',
    '3': '过热',
    '4': '失效',
    '5': '过电压',
    '6': '未指定故障',
    '7': '寒冷',
  },
  battery_status: {
    '1': '未知',
    '2': '充电中',
    '3': '放电中',
    '4': '未充电',
    '5': '充满',
  },
  battery_plugged: {
    '0': '电池',
    '1': '交流电',
    '2': 'USB',
    '3': '无线',
  },
  grant_permission: '授权',
  desktop_notification_permission_not_granted: '未授予桌面通知权限。',
  desktop_notification_permission_grant_title: '授予桌面通知权限',
  desktop_notification_permission_grant_message: '1. 点击地址栏中的挂锁图标。\n2. 打开“站点设置”或“权限”。\n3. 找到“通知”并将其更改为“允许”。',
  sort: '排序',
  sort_by: {
    date_asc: '最旧日期优先',
    date_desc: '最新日期优先',
    size_asc: '最小优先',
    size_desc: '最大优先',
    name_asc: '名称（从A到Z）',
    name_desc: '名称（从Z到A）',
  },
  print: '打印',
  cancel: '取消',
  ok: '好的',
  connection_timeout: '连接超时',
  save: '保存',
  saving: '保存中',
  saved: '已保存',
  status: '状态',
  enabled: '启用',
  updated: '已更新',
  enable: '启用',
  deleted: '已删除',
  create: '创建',
  listening_port: '监听端口',
  edit: '编辑',
  delete: '删除',
  actions: '操作',
  running: '运行中',
  stopped: '停止',
  basic: '基本',
  name: '名称',
  address: '地址',
  yes: '是',
  no: '否',
  my_phone: '我的手机',
  me: '我',
  password: '密码',
  chat_input_hint: '您想说什么？',
  release_to_send_file: '松手以发送文件',
  confirm_to_delete_name: '确认删除"{name}"?',
  confirm_to_delete: '确认删除?',
  valid: {
    string_min: '至少{min}个字符',
    required: '字段必填',
  },
  theme: {
    title: '主题',
    system: '系统默认',
    light: '浅色',
    dark: '黑暗',
  },
  language: {
    title: '语言',
    system: '系统默认',
  },
  exchange: {
    data_date: '日期',
  },
  education: {
    memorize_words: '记单词',
  },
  log_in: '登录',
  logging_in: '登录中',
  login: {
    to_continue: '请在手机上点击允许按钮才能继续操作。',
    failed: '登录失败，请确认手机没有进入休眠模式。',
    rejected: '登录请求被拒绝。',
    invalid_password: '密码错误。',
  },
  header_actions: {
    language: '更改语言',
    theme: '更改主题',
    tasks: '任务列表',
    audios: '音频',
    logout: '退出登录',
    notifications: '通知',
  },
  page_title: {
    home: '首页',
    wireguard: 'WireGuard',
    network: '网络配置',
    wifi: '无线网络',
    rules: '网络规则',
    routes: '网络路由',
    devices: '网络设备',
    messages: '短信',
    contacts: '联系人',
    calls: '通话记录',
    apps: '应用',
    files: '文件',
    audios: '音频',
    videos: '视频',
    images: '图片',
    books: '书籍',
    feeds: '订阅',
    notes: '笔记',
    json_viewer: 'JSON查看器',
    qrcode_generator: '二维码生成器',
    trash: '回收站',
    aichats: 'ChatGPT',
    screen_mirror: '屏幕镜像',
    device_info: '设备信息',
  },
  wireguard: {},
  wifi: {
    ssid: '名称',
    hide_ssid: '隐藏网络不被发现',
  },
  manufacturer: '厂商',
  mac_address: 'MAC地址',
  ip_address: 'IP地址',
  online: '在线',
  offline: '离线',
  unknown: '未知',
  created_at: '创建时间',
  updated_at: '更新时间',
  active_at: '活跃时间',
  rename: '重命名',
  apply_to: '应用于',
  direction: '方向',
  match: '匹配',
  inbound: '进来',
  outbound: '出去',
  target_type: {
    ip: 'IP地址',
    net: '子网',
    dns: '域名',
    remote_port: '远程端口',
    internet: '互联网',
    iface: '本地网络',
    list: '目标列表',
  },
  all_devices: '所有设备',
  network: '网络',
  allow: '允许',
  block: '阻止',
  description: '描述',
  notes: '备注',
  rule_inbound: '{action}来自{target}的流量',
  rule_outbound: '{action}访问{target}',
  for_example: '示例',
  invalid_value: '输入有误',
  space: '',
  remote_port: '远程端口{port}',
  all_local_networks: '所有本地网络',
  examples_ip: '示例\n10.10.10.2\n10.10.10.2:80\n10.10.10.2:80,443–453\n[2606:4700:4700::1111]:443–453',
  examples_net: '示例\n10.10.10.0/24\n10.10.10.0/24:80\n10.10.10.0/24:80,443–453\n[2606:4700:4700::1111/127]:443–453',
  examples_dns: '示例\nexample.com\nexample.com:80\nexample.com:80,443–453',
  examples_remote_port: '示例\n1419\n1001–1024',
  route_description: '发往{target}的流量经过{if_name}',
  traffic_to: '流量发往',
  route_via: '路由通过',
  delete_message: '删除消息',
  social: '社交',
  messages: '短信',
  contacts: '联系人',
  calls: '通话记录',
  storage: '存储',
  files: '文件',
  music: '音乐',
  videos: '视频',
  images: '图片',
  audios: '音频',
  content: '内容',
  from: '来自',
  type: '类型',
  time: '时间',
  message_type: {
    1: '收件箱',
    2: '已发送',
    3: '草稿箱',
    4: '发件箱',
    inbox: '收件箱',
    sent: '已发送',
    outbox: '发件箱',
    drafts: '草稿箱',
  },
  artist: '艺术家',
  sms_address: '号码',
  phone_numbers: '电话号码',
  telephone: '电话',
  custom: '自定义',
  website: '网站',
  email: 'Email',
  phone_number: '电话号码',
  add_field: '添加更多项',
  im: '聊天工具',
  contact: {
    phone_number_type: {
      1: '住宅',
      2: '手机',
      3: '单位',
      4: '单位传真',
      5: '住宅传真',
      6: '寻呼机',
      7: '其他',
      8: '回拨号码',
      9: '车载电话',
      10: '公司总机',
      11: 'ISDN',
      12: '总机',
      13: '其他传真',
      14: '无线装置',
      15: '电报',
      16: 'TTY TDD',
      17: '单位手机',
      18: '单位寻呼机',
      19: '助理',
      20: '彩信',
    },
    email_type: {
      1: '个人',
      2: '工作',
      3: '其他',
      4: '手机',
    },
    address_type: {
      1: '住宅',
      2: '单位',
      3: '其他',
    },
    event_type: {
      1: '周年纪念日',
      2: '其他',
      3: '生日',
    },
    im_type: {
      0: 'AIM',
      1: 'Windows Live',
      2: '雅虎',
      3: 'Skype',
      4: 'QQ',
      5: '环聊',
      6: 'ICQ',
      7: 'Jabber',
      8: 'NetMeeting',
    },
    website_type: {
      1: '首页',
      2: '博客',
      3: '主页',
      4: '个人',
      5: '工作',
      6: 'FTP',
      7: '其他',
    },
  },
  call_type: {
    1: '呼入',
    2: '呼出',
    3: '未接',
    4: '语音信箱',
    5: '拒接',
    6: '已屏蔽',
    incoming: '呼入',
    outgoing: '呼出',
    missed: '未接',
  },
  app_type: {
    user: '用户',
    system: '系统',
  },
  first_name: '名字',
  last_name: '姓氏',
  middle_name: '中间名',
  prefix: '名称前缀',
  suffix: '名称后缀',
  browser_warning: '推荐使用最新版的Chrome浏览器',
  no_permission: '没有权限，请到手机应用 > "电脑浏览器访问"里面打开权限并刷新页面重试。',
  no_data: '没有数据。',
  loading: '加载中...',
  duration: '时长',
  started_at: '开始时间',
  phone_geo: '归属地',
  avatar: '头像',
  phone_isp_type: {
    1: '中国移动',
    2: '中国联通',
    3: '中国电信',
    4: '中国联通虚拟运营商',
    5: '中国电信虚拟运营商',
    6: '中国移动虚拟运营商',
  },
  storage_free_total: '剩余{free} 共{total}',
  current_path: '当前路径',
  create_folder: '创建目录',
  upload_files: '上传文件',
  upload_folder: '上传目录',
  preview: '预览',
  view: '查看',
  upload: '上传',
  download: '下载',
  copy: '复制',
  paste: '粘贴',
  cut: '剪切',
  duplicate: '创建副本',
  properties: '属性',
  show_hidden: '显示隐藏项',
  select_mode: '选择模式',
  modified_at: '修改时间',
  file_size: '文件大小',
  path: '路径',
  open: '打开',
  box_is_null: '请在应用中选择一个盒子再重试',
  battery_left: '电量{percentage}%',
  invalid_file_signature: '文件签名不一致',
  no_task: '暂无任务',
  upload_status: {
    created: '等待中',
    pending: '上传中',
    saving: '保存中',
    done: '已上传',
    error: '上传失败',
  },
  load_failed: '加载{name}失败',
  network_error: '网络异常，无法连接API',
  web_access_disabled: 'Web访问当前已禁用。请打开PlainApp > 右上角 💻 图标 > "电脑浏览器访问"页面，并点击"启用"开关。',
  play: '播放',
  add_to_playlist: '加入播放列表',
  added_to_playlist: '已加入播放列表！',
  select_first: '请先选择！',
  search_hint: '搜索…',
  keywords: '关键字',
  search: '搜索',
  tags: '标签',
  add_to_tags: '添加到标签',
  remove_from_tags: '移除标签',
  delete_files: '删除文件',
  clear_list: '清空列表',
  select_tags: '选择标签',
  tools: '工具',
  json_viewer: 'JSON查看器',
  qrcode_generator: '二维码生成器',
  title: '标题',
  restore: '恢复',
  trash: '回收站',
  move_to_trash: '移到回收站',
  work: '工作',
  expand_all: '展开全部',
  collapse_all: '合并全部',
  all: '全部',
  manage: '管理',
  subscriptions: '订阅源',
  published_at: '发布时间',
  source: '来源',
  view_original_article: '查看原文',
  add: '添加',
  add_tag: '添加标签',
  add_subscription: '添加订阅',
  import_opml_file: '导入OPML文件',
  export_opml_file: '导出OPML文件',
  rss_url: 'RSS地址',
  imported: '已导入',
  update_subscription: '更新订阅',
  sync_feeds: '同步订阅',
  sync_content: '同步正文内容',
  feeds_synced: '订阅已同步',
  syncing: '同步中...',
  meta_no_title: '[没有标题]',
  no_content: '[没有内容]',
  confirm: '确认',
  upload_audios: '您可以上传音频到Music目录或者其他目录下。',
  upload_videos: '您可以上传音频到Movies目录或者其他目录下。',
  upload_images: '您可以上传音频到Pictures目录或者其他目录下。',
  no_files: '没有文件',
  view_origin_image: '查看原图',
  new_chat: '创建会话',
  ai: '人工智能',
  config: '配置',
  api_key: 'API密钥',
  apps: '应用',
  version: '版本',
  size: '大小',
  recents: '最近',
  internal_storage: '内部存储',
  sdcard: '存储卡',
  recent_files: '最近访问',
  installed_at: '安装时间',
  screen_mirror: '屏幕镜像',
  try_again: '重试',
  stop_mirror: '停止镜像',
  fullscreen: '全屏显示',
  deleting: '删除中',
  uninstalling: '卸载中…',
  uninstall: '卸载',
  install: '安装',
  sending: '发送中…',
  usb_storage: 'USB存储',
  folders: '文件夹',
  color: '颜色',
  make_a_phone_call: '打电话',
  view_as_list: '列表视图',
  view_as_grid: '网格视图',
  pause: '暂停',
  playlist: '播放列表',
  no_api_key: '缺少 API 密钥',
  refresh: '刷新',
  info: '信息',
  zoom_in: '放大',
  zoom_out: '缩小',
  resize: '调整大小',
  rotate_left: '左旋转',
  rotate_right: '右旋转',
  close: '关闭',
  close_other_tabs: '关闭其他标签页',
  close_tabs_to_the_right: '关闭右侧标签页',
  relaunch_app: '重启应用',
  all_items_on_this_page_are_selected: '已选择此页面上{count}项。',
  all_items_are_selected: '已选择全部{count}项。',
  select_all_items: '选择所有{count}项',
  clear_selection: '清除选择',
  screen_mirror_request_permission_failed: '您还没有授权简朴截屏的权限。',
  screen_mirror_request_permission: '请在手机上点击“现在开始”按钮。\n如果权限窗口未显示，请重新启动简朴。\n请在{seconds}秒后再试。',
}
