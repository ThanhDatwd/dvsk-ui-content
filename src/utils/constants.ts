export const getStaticURL = () => "https://dvsk-ui-content.vercel.app";
export const getStaticScanUrl = () => process.env.DVSK_NEXT_PUBLIC_SCAN_URL;

export const OptionsLanguage = [
  {
    label: "English",
    value: "en",
  },
  {
    label: "VietNam",
    value: "vi",
  },
];
export const FooterData = [
  {
    page: "about",
    title: "title",
    itemFooter: [
      {
        label: "whitePaperEN",
        link: "/coming-soon",
      },
      {
        label: "whitePaperTaiwan",
        link: "/coming-soon",
      },
      {
        label: "contact",
        link: "/coming-soon",
      },
    ],
  },
  {
    page: "fAQ",
    title: "title",
    itemFooter: [
      {
        label: "feedback",
        link: "/coming-soon",
      },
      {
        label: "termsAndConditions",
        link: "/coming-soon",
      },
    ],
  },
  {
    page: "social",
    title: "title",
    itemFooter: [],
  },
];
export enum THEME {
  LIGHT = "light",
  DARK = "dark",
}
export const DEFAULT_AUTOCLOSE_TOAST = 2000;

export const optionFilterScan = [
  {
    label: "All filter",
    value: "all",
  },
  {
    label: "Address",
    value: "address",
  },
  {
    label: "Tokens",
    value: "tokens",
  },
  {
    label: "Name tags",
    value: "name-tags",
  },
  {
    label: "Labels",
    value: "labels",
  },
  {
    label: "Websites",
    value: "websites",
  },
];

export const character = [
  {
    name: "Trần Hưng Đạo",
    star: 5,
  },
  {
    name: "Trần Hưng Đạo",
    star: 5,
  },
  {
    name: "Trần Hưng Đạo",
    star: 5,
  },
  {
    name: "Trần Hưng Đạo",
    star: 5,
  },
  {
    name: "Trần Hưng Đạo",
    star: 5,
  },
  {
    name: "Trần Hưng Đạo",
    star: 5,
  },
  {
    name: "Trần Hưng Đạo",
    star: 5,
  },
  {
    name: "Trần Hưng Đạo",
    star: 5,
  },
];

export const listCharacter = [
  {
    name: "Trần Khánh Dư",
    url: `TranKhanhDu.png`,
    rate: 4,
    slug: "tran-khanh-du",
    scale: 0.017,
    value: "TranKhanhDu",
    introduces: [
      `Là người văn võ song toàn đường gươm của ông được ví như “tuyết rơi, hoa nở” có thể xông vào đám quân cả ngàn người như vào chỗ không người. `,
      `Trần Khánh Dư tiếp tục có công lớn trong hai lần chống quân Nguyên tiếp theo, đặc biệt là đánh tan đạo binh thuyền chở lương thực, khí giới của do Trương Văn Hổ chỉ huy vào tháng 12/1287, làm xoay chuyển tình thế chiến cuộc, dẫn đến thắng lợi cuối cùng, đuổi sạch bóng giặc Nguyên Mông ra khỏi bờ cõi Đại Việt vào năm 1288. `,
      `Đến tháng 5/1312, ông còn theo vua Trần Anh Tông đem quân đi đánh Chiêm Thành, bắt được cả chúa Chiêm Thành là Chế Chí đưa về nước.`,
    ],
    dataSet: [6, 3, 1, 5, 1],
    tokenId: 2,
  },
  {
    name: "Phạm Ngũ Lão",
    url: `PhamNguLao.png`,
    rate: 4,
    slug: "pham-ngu-lao",
    scale: 0.06,
    value: "PhamNguLao",
    introduces: [
      `Ông nổi tiếng là người thông minh, văn võ toàn tài bậc nhất, có chí lớn và đạo đức cao`,
      `Dù xuất thân bình dân, nhưng đã trở thành Điện úy Thượng tướng quân, uy danh đức vọng rất lớn, được sánh ngang với Hưng Đạo vương và được hưởng ân điển đặc biệt của triều Trần.`,
      `Cuộc đời và sự nghiệp của Phạm Ngũ Lão đã trở thành huyền thoại lớn trong lịch sử dân tộc,minh chứng cho tư tưởng và nghệ thuật quân sự nhân dân thời Trần. Tài năng xuất chúng đã khiến ông, dù không phải vương hầu, nhưng đều được các triều vua Trần nể trọng.`,
    ],
    dataSet: [5, 3, 2, 5, 6],
    tokenId: 4,
  },
  {
    name: "Trần Quốc Toản",
    url: `TranQuocToan.png`,
    rate: 3,
    slug: "tran-quoc-toan",
    scale: 0.03,
    value: "",
    introduces: [
      `Tướng tài với sáu chữ vàng "Phá cường địch,  báo hoàng ân" Vị tướng trẻ tuổi mang trong mình lòng yêu nước, lòng quả cảm và ý chí kiên cường`,
      `Trần Quốc Toản với giai thoại nổi tiếng "bóp nát quả cam" tại hội nghị Bình Than do trẻ tuổi không được tham gia để bàn việc quân. Không nản lòng Trần Quốc Toản đã tự tập hợp binh lính, rèn luyện binh khí đứng lên khởi nghĩa chống giặc ngoại xâm.`,
      `Sau với ý chí kiên cường ông được phong tước Hầu Văn Vương và sát nhập binh lính cùng tham gia khởi nghĩa.`,
    ],
    dataSet: [7, 2, 3, 5, 4],
    tokenId: 1,
  },
  {
    name: "Trần Thủ Độ",
    url: `TranThuDo.png`,
    rate: 5,
    slug: "tran-thu-do",
    scale: 0.03,
    value: "",
    introduces: [
      `Ông nổi tiếng là người thông minh, văn võ toàn tài bậc nhất, có chí lớn và đạo đức cao, nên dù xuất thân bình dân, nhưng đã trở thành Điện úy Thượng tướng quân,uy danh đức vọng rất lớn, được sánh ngang với Hưng Đạo vương và được hưởng ân điển đặc biệt của triều Trần.`,
      `Cuộc đời và sự nghiệp của Phạm Ngũ Lão đã trở thành huyền thoại lớn trong lịch sử dân tộc, minh chứng cho tư tưởng và nghệ thuật quân sự nhân dân thời Trần. Tài năng xuất chúng đã khiến ông, dù không phải vương hầu, nhưng đều được các triều vua Trần nể trọng.`,
    ],
    dataSet: [4, 3, 3, 5, 2],
  },
  {
    name: "Dã Tượng",
    url: `DaTuong.png`,
    rate: 4,
    slug: "da-tuong",
    scale: 0.03,
    value: "",
    introduces: [
      `Ông có biệt tài thuần hóa tượng rừng (dã tượng) và chỉ huy đội tượng binh vô cùng tài giỏi, được phong làm "tiết chế binh nhung" Dã Tượng là bậc gia tướng chẳng những giỏi về chiến đấu, mà còn biết đặt lợi ích dân tộc lên trên hết, xem nhẹ bổng lộc triều đình phe phái ban cho.`,
      `Không chỉ có tài dùng binh, Dã Tượng còn là người rất trung nghĩa. Ông đã một lòng trung thành và dám đưa ra lời khuyên Hưng Đạo vương nên bỏ mối thù nhà để toàn tâm dốc sức cứu nước.`,
    ],
    dataSet: [2, 3, 1, 5, 4],
  },
  {
    name: "Trương Công Hoằng",
    url: `TruongCongHoang.png`,
    rate: 4,
    slug: "truong-cong-hoang",
    scale: 0.03,
    value: "",
    introduces: [
      `Công Hoằng là Trung Hoa tể kiêm Quản long hưng phù Đại tướng Là vị tướng đã giúp ích rất lớn trong công cuộc chống Mông - Nguyên Ông có một người em song sinh nữ là Trương Thị Mỹ Nương. `,
      `Làng Vô Hối thờ người em Trương Thị Mỹ Nương; làng An Lạc thờ người anh Trương Công Hoằng.`,
    ],
    dataSet: [3, 7, 3, 2, 4],
  },

  {
    name: "Trần Nhật Duật",
    url: `TranNhatDuat.png`,
    rate: 5,
    slug: "tran-nhat-duat",
    scale: 0.03,
    value: "",
    introduces: [
      `Chiêu Văn Vương Trần Nhật Duật là con thứ sáu của vua Trần Thái Tông, tuy là vương tử nhưng đời sống rất xuề xòa, phóng khoáng, dễ tiếp xúc và không câu nệ.`,
      `Ông còn là một nhà nghệ sĩ giỏi và rất say mê âm nhạc, đã sáng tác rất nhiều khúc nhạc, lời ca, điệu múa. Trần Nhật Duật xứng đáng là danh nhân Việt Nam, văn võ toàn tài, có thể được xem là ông tổ của ngành ngoại giao Việt Nam. `,
      `Tuy làm đến chức tể tướng và thái sư nhưng không bao giờ tham lam quyền lực bởi vì sống trong lòng ông là một tinh thần nghệ sĩ độ lượng trong nét khảng khái và nhân hòa.`,
    ],
    dataSet: [2, 3, 1, 5, 2],
  },
  {
    name: "Trần Quang Khải",
    url: `TranQuangKhai.png`,
    rate: 4,
    slug: "tran-quang-khai",
    scale: 0.03,
    value: "",
    introduces: [
      `Trần Quang Khải vốn có tư chất thông minh, ham học, lại có được Bảng nhãn Lê Văn Hưu làm thầy, nên ông sớm trở thành nhân vật văn võ toàn tài. Không chỉ trực tiếp cầm binh ra trận, toàn thắng nhiều trận đánh lớn. Ông được biết đến nhiều với cương vị một nhà chính trị gia kiệt xuất, với nghệ thuật ứng xử mềm dẻo, khôn khéo nhiều lần giúp nhà Trần giữ vững non sông mà không không gây hiềm khích.`,
      `Trần Quang Khải còn được biết đến là một nhà thơ đặc sắc, có vị trí trong việc nghiên cứu lịch sử tiến trình văn học Việt Nam `,
    ],
    dataSet: [5, 3, 1, 2, 4],
  },
  {
    name: "Trần Thị Dung",
    url: `TranThiDung.png`,
    rate: 3,
    slug: "tran-thi-dung",
    scale: 0.03,
    value: "",
    introduces: [
      `Linh từ Quốc mẫu Trần Thị Dung là người con gái thông minh, tài ba, gan dạ và có chí lớn, có đầu óc tổ chức phi thường.`,
      `Theo sử cũ, khi Trần Thủ Độ chưa xuất hiện, bà là người cáng đáng toàn bộ sự vất vả gian truân, trầm luân để mở nghiệp nhà Trần. Đến lúc có Trần Thủ Độ trong cung đình, bà đã cộng tác đắc lực với Trần Thủ Độ trong việc khai sinh và xây dựng triều đại nhà Trần, đáp ứng được đòi hỏi xây dựng một đất nước vững mạnh để chống giặc Nguyên - Mông đang lăm le xâm lược Đại Việt.`,
    ],
    dataSet: [4, 2, 3, 6, 1],
    tokenId: 5,
  },
  {
    name: "Công Chúa An Tư",
    url: `CongChuaAnTu.png`,
    rate: 4,
    slug: "cong-chua-an-tu",
    scale: 0.0065,
    value: "CongChuaAnTu",
    introduces: [
      `Vì nước, vì dân, công chúa An Tư tuy còn rất trẻ đã từ bỏ cuộc sống nhung lụa trong cung đình, hy sinh thân gái để gánh vác vận mệnh của giang sơn`,
      ` An Tư đã vào trận chiến chỉ có một mình, không một tấc sắt trong tay. Bà hiểu rõ đất nước đang lâm nguy, bản thân không có sự lựa chọn nào khác, công chúa chấp nhận gian khổ, tủi nhục và cái chết để đổi lấy sự bình yên cho Tổ quốc.`,
    ],
    dataSet: [2, 3, 5, 3, 2],
    tokenId: 3,
  },
  {
    name: "Trần Hưng Đạo",
    url: `TranHungDao.png`,
    rate: 5,
    slug: "tran-hung-dao",
    scale: 0.03,
    value: "",
    introduces: [
      "Mệnh danh “Bình Bắc Đại Nguyên Soái”, là nhà quân sự thiên tài, nhà chính trị vẹn toàn tài đức",
      "Ông nổi tiếng với học vấn rất uyên bác, vừa giỏi văn chương vừa hiểu thấu lục thao tam lược, cưỡi ngựa, bắn cung đều thành thạo",
      "Ba lần cầm quân phá tan quân Nguyên Mông xâm lược nước ta.",
      "Bên cạnh tư tưởng quân sự kiệt xuất, Trần Quốc Tuấn còn nêu một tấm gương về lòng trung nghĩa sáng suốt, biết gạt bỏ mọi hiềm khích riêng để đoàn kết các tôn thất và tướng tá trong triều nhằm phò vua giúp nước, đánh bại kẻ thù.",
    ],
    dataSet: [7, 3, 3, 5, 4],
  },
];

export const launchInfo = [
  {
    quater: 2024,
    data: [
      {
        title: "quarter1",
        infos: ["quarter1Introduce", "quarter1OpenBeta", "quarter1Launch"],
      },
      {
        title: "quarter2",
        infos: ["quarter2Launch", "quarter2Function"],
      },
      {
        title: "quarter3",
        infos: ["quarter3Introduce", "quarter3OpenBeta", "quarter3Launch"],
      },
      {
        title: "quarter4",
        infos: ["quarter4Introduce", "quarter4OpenBeta", "quarter4Launch"],
      },
    ],
  },
  {
    quater: 2025,
    data: [
      {
        title: "quarter1",
        infos: ["quarter1Introduce", "quarter1OpenBeta", "quarter1Launch"],
      },
      {
        title: "quarter2",
        infos: ["quarter2Launch", "quarter2Function"],
      },
      {
        title: "quarter3",
        infos: ["quarter3Introduce", "quarter3OpenBeta", "quarter3Launch"],
      },
      {
        title: "quarter4",
        infos: ["quarter4Introduce", "quarter4OpenBeta", "quarter4Launch"],
      },
    ],
  },
  {
    quater: 2026,
    data: [
      {
        title: "quarter1",
        infos: ["quarter1Introduce", "quarter1OpenBeta", "quarter1Launch"],
      },
      {
        title: "quarter2",
        infos: ["quarter2Launch", "quarter2Function"],
      },
      {
        title: "quarter3",
        infos: ["quarter3Introduce", "quarter3OpenBeta", "quarter3Launch"],
      },
      {
        title: "quarter4",
        infos: ["quarter4Introduce", "quarter4OpenBeta", "quarter4Launch"],
      },
    ],
  },
  {
    quater: 2027,
    data: [
      {
        title: "quarter1",
        infos: ["quarter1Introduce", "quarter1OpenBeta", "quarter1Launch"],
      },
      {
        title: "quarter2",
        infos: ["quarter2Launch", "quarter2Function"],
      },
      {
        title: "quarter3",
        infos: ["quarter3Introduce", "quarter3OpenBeta", "quarter3Launch"],
      },
      {
        title: "quarter4",
        infos: ["quarter4Introduce", "quarter4OpenBeta", "quarter4Launch"],
      },
    ],
  },
];

export const teamInfo = [
  {
    bannerUrl: `${getStaticURL()}/assets/images/memberImage.svg`,
    avatarUrl: `${getStaticURL()}/assets/images/memberDevelopmentImage.svg`,
    name: "Nguyễn Văn Phi",
    position: "CEO - XBox Studio",
    infoMore: {
      info1: "Thông tin 1: xyz",
      info2: "Thông tin 2: xyz",
      info3: "Thông tin 3: xyz",
    },
  },
  {
    bannerUrl: `${getStaticURL()}/assets/images/memberImage.svg`,
    avatarUrl: `${getStaticURL()}/assets/images/memberDevelopmentImage.svg`,
    name: "Nguyễn Văn Phi",
    position: "Employee",
    infoMore: {
      info1: "Thông tin 1: xyz",
      info2: "Thông tin 2: xyz",
      info3: "Thông tin 3: xyz",
    },
  },
  {
    bannerUrl: `${getStaticURL()}/assets/images/memberImage.svg`,
    avatarUrl: `${getStaticURL()}/assets/images/memberDevelopmentImage.svg`,
    name: "Nguyễn Văn Phi",
    position: "Employee",
    infoMore: {
      info1: "Thông tin 1: xyz",
      info2: "Thông tin 2: xyz",
      info3: "Thông tin 3: xyz",
    },
  },
  {
    bannerUrl: `${getStaticURL()}/assets/images/memberImage.svg`,
    avatarUrl: `${getStaticURL()}/assets/images/memberDevelopmentImage.svg`,
    name: "Nguyễn Văn Phi",
    position: "Employee",
    infoMore: {
      info1: "Thông tin 1: xyz",
      info2: "Thông tin 2: xyz",
      info3: "Thông tin 3: xyz",
    },
  },
  {
    bannerUrl: `${getStaticURL()}/assets/images/memberImage.svg`,
    avatarUrl: `${getStaticURL()}/assets/images/memberDevelopmentImage.svg`,
    name: "Nguyễn Văn Phi",
    position: "Employee",
    infoMore: {
      info1: "Thông tin 1: xyz",
      info2: "Thông tin 2: xyz",
      info3: "Thông tin 3: xyz",
    },
  },
  {
    bannerUrl: `${getStaticURL()}/assets/images/memberImage.svg`,
    avatarUrl: `${getStaticURL()}/assets/images/memberDevelopmentImage.svg`,
    name: "Nguyễn Văn Phi",
    position: "Employee",
    infoMore: {
      info1: "Thông tin 1: xyz",
      info2: "Thông tin 2: xyz",
      info3: "Thông tin 3: xyz",
    },
  },
  {
    bannerUrl: `${getStaticURL()}/assets/images/memberImage.svg`,
    avatarUrl: `${getStaticURL()}/assets/images/memberDevelopmentImage.svg`,
    name: "Nguyễn Văn Phi",
    position: "Employee",
    infoMore: {
      info1: "Thông tin 1: xyz",
      info2: "Thông tin 2: xyz",
      info3: "Thông tin 3: xyz",
    },
  },
  {
    bannerUrl: `${getStaticURL()}/assets/images/memberImage.svg`,
    avatarUrl: `${getStaticURL()}/assets/images/memberDevelopmentImage.svg`,
    name: "Nguyễn Văn Phi",
    position: "Employee",
    infoMore: {
      info1: "Thông tin 1: xyz",
      info2: "Thông tin 2: xyz",
      info3: "Thông tin 3: xyz",
    },
  },
];

export const partnerData = [
  {
    title: "partner1",
    content: "partnerContent",
  },
  {
    title: "partner2",
    content: "partnerContent",
  },
  {
    title: "partner3",
    content: "partnerContent",
  },
  {
    title: "partner4",
    content: "partnerContent",
  },
];

export const timerData = [2024, 2025, 2026, 2027];
export const tabs = ["news", "event", "community"];
export const AVAILABLE_GIFTBOXES = 100;

export const tabContentList = [
  {
    tabName: "news",
    article: [
      {
        title: "notiOne",
        date: "25/06/2023",
        hot: true,
      },
      {
        title: "notiTwo",
        date: "25/04/2023",
        hot: true,
      },
      {
        title: "notiThree",
        date: "25/02/2023",
        hot: false,
      },
      {
        title: "notiFour",
        date: "05/01/2023",
        hot: false,
      },
      {
        title: "notiFive",
        date: "05/01/2023",
        hot: false,
      },
    ],
  },
  {
    tabName: "event",
    article: [
      {
        title: "notiOne",
        date: "25/06/2023",
        hot: true,
      },
      {
        title: "notiTwo",
        date: "25/04/2023",
        hot: true,
      },
      {
        title: "notiThree",
        date: "25/02/2023",
        hot: false,
      },
      {
        title: "notiFour",
        date: "05/01/2023",
        hot: false,
      },
      {
        title: "notiFive",
        date: "05/01/2023",
        hot: false,
      },
    ],
  },
  {
    tabName: "community",
    article: [
      {
        title: "notiOne",
        date: "25/06/2023",
        hot: true,
      },
      {
        title: "notiTwo",
        date: "25/04/2023",
        hot: true,
      },
      {
        title: "notiThree",
        date: "25/02/2023",
        hot: false,
      },
      {
        title: "notiFour",
        date: "05/01/2023",
        hot: false,
      },
      {
        title: "notiFive",
        date: "05/01/2023",
        hot: false,
      },
    ],
  },
];

export const applications = ["Appstore", "Google Play", "Window", "APK"];

export const appName = {
  appStore: "Appstore",
  googlePlay: "Google Play",
  window: "Window",
  apk: "APK",
};

export const ADDRESS_NULL = "0x0000000000000000000000000000000000000000";

export enum REFERRAL_PAYOUT_STATUS {
  NOT_PAID = "not_paid",
  IN_PROGRESS = "in_progress",
  PAID = "paid",
}

export enum NETWORK {
  ETHEREUM = "ethereum",
  BINANCE = "binance",
}

export enum Currencies {
  USC = "USC",
  USDT = "USDT",
}

export enum ACCEPTED_CURRENCY {
  USDT = "USDT",
  VPL = "VPL",
}
export const USDT_TO_VPL_EXCHANGE_RATE = 0.00007;

export const MINIMUM_TX_CONFIRMATION = 5;
export const REFECT_CONFIRMATION_BLOCK = 3000;

export const ERR_CODE = {
  NOT_FOUND: "NOT_FOUND".toLowerCase(),
  USER_NOT_FOUND: "USER_NOT_FOUND".toLowerCase(),
  CIRCLE_REFERRAL_NOT_ALLOWED: "CIRCLE_REFERRAL_NOT_ALLOWED".toLowerCase(),
  NOT_TX_OWNER: "NOT_TX_OWNER".toLowerCase(),
  CONFIRMATION_TOO_LOW: "CONFIRMATION_TOO_LOW".toLowerCase(),
  INVALID_CURRENCY: "INVALID_CURRENCY".toLowerCase(),
  INVALID_TX_FUNCTION: "INVALID_TX_FUNCTION".toLowerCase(),
  INVALID_PURCHASE_PRICE: "INVALID_PURCHASE_PRICE".toLowerCase(),
  INVALID_DEPOSIT_ADDRESS: "INVALID_DEPOSIT_ADDRESS".toLowerCase(),
  NO_VACANT_GIFTBOX: "NO_VACANT_GIFTBOX".toLowerCase(),
  GIFTBOX_NOT_AVAILABLE: "GIFTBOX_NOT_AVAILABLE".toLowerCase(),
  INVALID_SIGNATURE: "INVALID_SIGNATURE".toLowerCase(),
  NOT_GIFTBOX_OWNER: "NOT_GIFTBOX_OWNER".toLowerCase(),
  TX_HASH_USED: "TX_HASH_USED".toLowerCase(),
  USER_LOCKED: "USER_LOCKED".toLowerCase(),
  INVALID_CAPTCHA_TOKEN: "INVALID_CAPTCHA_TOKEN".toLowerCase(),
  MAX_GIFTBOX_CAPACITY_REACHED: "MAX_GIFTBOX_CAPACITY_REACHED".toLowerCase(),
  OTHER_BOX_LOCKED: "OTHER_BOX_LOCKED".toLowerCase(),
  ALREADY_BOUGHT: "ALREADY_BOUGHT".toLowerCase(),
  MAX_SPIN_REACHED: "MAX_SPIN_REACHED".toLowerCase(),
  NO_MORE_SPIN_SLOTS: "NO_MORE_SPIN_SLOTS".toLowerCase(),
  END_OF_TURN: "END_OF_TURN".toLowerCase(),
  PRICE_SLID_TOO_MUCH: "PRICE_SLID_TOO_MUCH".toLowerCase(),
};

export const TimeRange = 5 * 60;

export const AMOUNT_BUY_GIFT = 200;

export const NFT_CHARACTER_INFO = {
  1: {
    name: "Trần Quốc Toản",
    description: "⭐️⭐️⭐️ Chiêu Văn Vương ⭐️⭐️⭐️",
    image: `${getStaticURL()}/assets/images/2d/TranQuocToan.png`,
  },
  2: {
    name: "Trần Khánh Dư",
    description: "⭐️⭐️⭐️⭐️ Nhân Huệ Vương Thiên Tử Nghĩa Nam ⭐️⭐️⭐️⭐️",
    image: `${getStaticURL()}/assets/images/2d/TranKhanhDu.png`,
  },
  3: {
    name: "Công Chúa An Tư",
    description: "⭐️⭐️⭐️⭐️ Thánh Tông Quí Muội ⭐️⭐️⭐️⭐️",
    image: `${getStaticURL()}/assets/images/2d/CongChuaAnTu.png`,
  },
  4: {
    name: "Phạm Ngũ Lão",
    description:
      "⭐️⭐️⭐️⭐️ Vị tướng vĩ đại nhất trong lịch sử quân sự phong kiến Việt Nam ⭐️⭐️⭐️⭐️",
    image: `${getStaticURL()}/assets/images/2d/PhamNguLao.png`,
  },
  5: {
    name: "Trần Thị Dung",
    description: "⭐️⭐️⭐️ Linh Từ Quốc Mẫu ⭐️⭐️⭐️",
    image: `${getStaticURL()}/assets/images/2d/TranThiDung.png`,
  },
};
