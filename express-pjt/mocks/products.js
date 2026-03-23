const products = [
  {
    id: 1,
    name: "오로라 실크터치 셔츠",
    description:
      "은은한 광택이 도는 실크터치 원단으로, 단정한 오피스룩부터 데일리룩까지 폭넓게 활용 가능한 셔츠입니다. 어깨선은 자연스럽게 떨어지고, 소매는 살짝 여유 있게 설계되어 편안한 착용감을 제공합니다.",
    price: 49000,
    meta: { heart: 1240, review: 318 },
    category: "상의",
    imageUrl:
      "https://images.unsplash.com/photo-1607345366928-199ea26cfe3e?w=500&auto=format&fit=crop&q=60",
    size: ["90", "95", "100", "105", "110", "115", "120"],
  },
  {
    id: 2,
    name: "클라우드 라이트 후드 집업",
    description:
      "가볍게 걸치기 좋은 라이트 후드 집업으로, 부드러운 기모 안감이 체온을 안정적으로 유지해줍니다. 지퍼 라인은 매끄럽게 마감되어 이너 위에 레이어드하기 좋고, 손목과 밑단 시보리가 핏을 깔끔하게 잡아줍니다.",
    price: 59000,
    meta: { heart: 980, review: 205 },
    category: "상의",
    imageUrl:
      "https://images.unsplash.com/photo-1635205383450-e0fee6fe73c4?w=500&auto=format&fit=crop&q=60",
    size: ["90", "95", "100", "105", "110", "115", "120"],
  },
  {
    id: 3,
    name: "어반핏 세미와이드 슬랙스",
    description:
      "허리부터 밑단까지 매끈하게 떨어지는 세미와이드 실루엣으로, 다리가 길어 보이는 효과가 있습니다. 구김이 적은 소재로 하루 종일 착용해도 흐트러짐이 덜하고, 셔츠/니트 어떤 상의와도 깔끔하게 매치됩니다.",
    price: 52000,
    meta: { heart: 1544, review: 412 },
    category: "하의",
    imageUrl:
      "https://images.unsplash.com/photo-1641839677234-c8a439c2f92e?w=500&auto=format&fit=crop&q=60",
    size: ["90", "95", "100", "105", "110", "115", "120"],
  },
  {
    id: 4,
    name: "모던라인 데님 재킷",
    description:
      "적당한 두께감의 데님 소재로 사계절 활용도가 높은 재킷입니다. 어깨 라인은 각 잡히지 않게 설계해 부담 없이 걸칠 수 있고, 워싱 디테일이 과하지 않아 미니멀한 코디에도 잘 어울립니다.",
    price: 79000,
    meta: { heart: 732, review: 146 },
    category: "상의",
    imageUrl:
      "https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=500&auto=format&fit=crop&q=60",
    size: ["90", "95", "100", "105", "110", "115", "120"],
  },
  {
    id: 5,
    name: "데일리 리브드 니트 탑",
    description:
      "촘촘한 리브 조직으로 바디 라인을 깔끔하게 정리해주는 니트 탑입니다. 단독으로 입어도 비침이 덜하고, 재킷이나 코트 안 이너로도 활용도가 높습니다. 목선이 예쁘게 보이는 라운드 넥으로 마감했습니다.",
    price: 36000,
    meta: { heart: 2102, review: 508 },
    category: "상의",
    imageUrl:
      "https://plus.unsplash.com/premium_photo-1673757121153-6db83b6e7a1c?w=500&auto=format&fit=crop&q=60",
    size: ["90", "95", "100", "105", "110", "115", "120"],
  },
  {
    id: 6,
    name: "스카이러너 쿠션 스니커즈",
    description:
      "장시간 걸어도 발이 덜 피로한 쿠션 인솔을 적용한 스니커즈입니다. 발등을 편안하게 감싸는 갑피와 미끄럼을 줄여주는 아웃솔로 데일리/여행용으로 추천합니다. 군더더기 없는 디자인이라 코디가 쉬워요.",
    price: 69000,
    meta: { heart: 1850, review: 377 },
    category: "신발",
    imageUrl:
      "https://images.unsplash.com/photo-1549298916-b41d501d3772?w=500&auto=format&fit=crop&q=60",
    size: ["90", "95", "100", "105", "110", "115", "120"],
  },
  {
    id: 7,
    name: "윈터브리즈 울 블렌드 코트",
    description:
      "울 블렌드 소재로 보온성과 고급스러운 결을 동시에 챙긴 코트입니다. 히든 버튼으로 앞면이 깔끔하며, 안감 마감이 부드러워 니트 위에 입어도 쓸림이 적습니다. 포멀부터 캐주얼까지 모두 소화합니다.",
    price: 149000,
    meta: { heart: 642, review: 92 },
    category: "상의",
    imageUrl:
      "https://images.unsplash.com/photo-1717674796027-054accb36f2c?w=500&auto=format&fit=crop&q=60",
    size: ["90", "95", "100", "105", "110", "115", "120"],
  },
  {
    id: 8,
    name: "시그니처 스트라이프 롱티",
    description:
      "경쾌한 스트라이프 패턴과 여유 있는 기장으로 레이어드에 최적화된 롱티입니다. 탄탄한 코튼 원단으로 늘어짐이 덜하고, 단독 착용 시에도 핏이 깔끔하게 유지됩니다.",
    price: 33000,
    meta: { heart: 1288, review: 241 },
    category: "상의",
    imageUrl:
      "https://images.unsplash.com/photo-1717674796145-0edd1378fd89?w=500&auto=format&fit=crop&q=60",
    size: ["90", "95", "100", "105", "110", "115", "120"],
  },
  {
    id: 9,
    name: "미드나잇 슬림 데님 팬츠",
    description:
      "다리 라인을 예쁘게 잡아주는 슬림 핏 데님으로, 탄성 있는 소재를 사용해 착용감이 편안합니다. 어두운 인디고 컬러로 상의를 가리지 않고, 셔츠/후드/니트 모두 잘 어울립니다.",
    price: 54000,
    meta: { heart: 1679, review: 389 },
    category: "하의",
    imageUrl:
      "https://images.unsplash.com/photo-1614492034550-71ea2d75704e?w=500&auto=format&fit=crop&q=60",
    size: ["90", "95", "100", "105", "110", "115", "120"],
  },
  {
    id: 10,
    name: "코튼필드 베이직 반팔",
    description:
      "핏이 무너지지 않도록 넥라인을 탄탄하게 잡은 베이직 반팔 티셔츠입니다. 단독 착용은 물론 자켓/가디건 이너로도 활용도가 매우 높고, 촉감이 부드러워 데일리로 손이 자주 가는 제품입니다.",
    price: 19000,
    meta: { heart: 3021, review: 812 },
    category: "상의",
    imageUrl:
      "https://images.unsplash.com/photo-1616404662085-b81be2812cf2?w=500&auto=format&fit=crop&q=60",
    size: ["90", "95", "100", "105", "110", "115", "120"],
  },
  {
    id: 11,
    name: "리버사이드 윈드브레이커",
    description:
      "가볍고 바람막이 기능이 우수한 소재로, 일교차가 큰 날이나 야외 활동에 적합합니다. 후드는 끈 조절이 가능하고, 포켓 지퍼로 소지품을 안전하게 보관할 수 있어 실용성이 뛰어납니다.",
    price: 68000,
    meta: { heart: 911, review: 174 },
    category: "상의",
    imageUrl:
      "https://plus.unsplash.com/premium_photo-1697183202031-513b9901535d?w=500&auto=format&fit=crop&q=60",
    size: ["90", "95", "100", "105", "110", "115", "120"],
  },
  {
    id: 12,
    name: "루미너스 플리츠 스커트",
    description:
      "움직일 때마다 자연스럽게 흐르는 플리츠 라인이 매력적인 스커트입니다. 허리 밴딩으로 편안하며, 니트/셔츠와 매치하면 데이트룩부터 포멀룩까지 다양하게 연출할 수 있습니다.",
    price: 47000,
    meta: { heart: 1205, review: 266 },
    category: "하의",
    imageUrl:
      "https://plus.unsplash.com/premium_photo-1737659254929-44685a35717b?w=500&auto=format&fit=crop&q=60",
    size: ["90", "95", "100", "105", "110", "115", "120"],
  },
  {
    id: 13,
    name: "헤리티지 트러커 캡",
    description:
      "심플한 로고 자수와 안정적인 깊이감으로 누구나 잘 어울리는 트러커 캡입니다. 뒷면 스트랩으로 사이즈 조절이 가능하고, 캐주얼 코디에 포인트로 활용하기 좋습니다.",
    price: 24000,
    meta: { heart: 860, review: 141 },
    category: "모자",
    imageUrl:
      "https://images.unsplash.com/photo-1534215754734-18e55d13e346?w=500&auto=format&fit=crop&q=60",
    size: ["90", "95", "100", "105", "110", "115", "120"],
  },
  {
    id: 14,
    name: "샌드라인 린넨 셔츠",
    description:
      "통기성이 좋은 린넨 혼방 소재로 여름까지 쾌적하게 입을 수 있는 셔츠입니다. 자연스러운 구김이 멋스럽고, 소매를 롤업해도 흐트러짐이 덜해 휴양지룩/데일리룩 모두에 추천합니다.",
    price: 45000,
    meta: { heart: 998, review: 203 },
    category: "상의",
    imageUrl:
      "https://images.unsplash.com/photo-1563389234808-52344934935c?w=500&auto=format&fit=crop&q=60",
    size: ["90", "95", "100", "105", "110", "115", "120"],
  },
  {
    id: 15,
    name: "오프화이트 니트 가디건",
    description:
      "부드러운 니트 텍스처로 포근한 분위기를 주는 가디건입니다. 버튼 간격이 균형 있게 설계되어 단추를 잠가도, 오픈해도 실루엣이 예쁩니다. 봄/가을에 특히 활용도가 높아요.",
    price: 62000,
    meta: { heart: 1107, review: 219 },
    category: "상의",
    imageUrl:
      "https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=500&auto=format&fit=crop&q=60",
    size: ["90", "95", "100", "105", "110", "115", "120"],
  },
  {
    id: 16,
    name: "스노우필드 패딩 베스트",
    description:
      "가볍지만 따뜻한 충전재로 보온성을 높인 패딩 베스트입니다. 두께감이 과하지 않아 레이어드하기 좋고, 실내외 온도 차가 큰 날에도 편하게 걸칠 수 있습니다.",
    price: 75000,
    meta: { heart: 705, review: 128 },
    category: "상의",
    imageUrl:
      "https://images.unsplash.com/photo-1578681994506-b8f463449011?w=500&auto=format&fit=crop&q=60",
    size: ["90", "95", "100", "105", "110", "115", "120"],
  },
  {
    id: 17,
    name: "포그웨이 러닝 쇼츠",
    description:
      "가벼운 기능성 원단으로 땀 배출이 빠르고 건조가 쉬운 러닝 쇼츠입니다. 허리 밴딩이 편안하고, 활동 시 말림을 줄인 패턴으로 설계되어 운동/산책/홈웨어로 모두 좋습니다.",
    price: 29000,
    meta: { heart: 640, review: 97 },
    category: "하의",
    imageUrl:
      "https://images.unsplash.com/photo-1473966968600-fa801b869a1a?w=500&auto=format&fit=crop&q=60",
    size: ["90", "95", "100", "105", "110", "115", "120"],
  },
  {
    id: 18,
    name: "블랙스톤 더비 슈즈",
    description:
      "클래식한 무드의 더비 슈즈로 포멀룩의 완성도를 높여줍니다. 발을 안정적으로 지지하는 라스트와 적당한 굽 높이로 착화감이 좋고, 슬랙스부터 데님까지 폭넓게 매치됩니다.",
    price: 99000,
    meta: { heart: 530, review: 83 },
    category: "신발",
    imageUrl:
      "https://images.unsplash.com/photo-1556774687-0e2fdd0116c0?w=500&auto=format&fit=crop&q=60",
    size: ["90", "95", "100", "105", "110", "115", "120"],
  },
  {
    id: 19,
    name: "스프링데이 크롭 맨투맨",
    description:
      "세미 크롭 기장으로 비율을 예쁘게 만들어주는 맨투맨입니다. 안쪽 기모는 과하지 않게 넣어 계절 전환기에 입기 좋고, 넥라인/소매 시보리 마감이 탄탄해 오래 입어도 형태가 유지됩니다.",
    price: 41000,
    meta: { heart: 1333, review: 271 },
    category: "상의",
    imageUrl:
      "https://plus.unsplash.com/premium_photo-1669703777695-f8052a432411?w=500&auto=format&fit=crop&q=60",
    size: ["90", "95", "100", "105", "110", "115", "120"],
  },
  {
    id: 20,
    name: "파인그레이 테이퍼드 치노",
    description:
      "허벅지는 여유롭고 발목으로 갈수록 좁아지는 테이퍼드 핏으로, 깔끔하면서도 편안한 착용감을 제공합니다. 치노 특유의 탄탄함으로 핏이 오래 유지되고, 다양한 상의와 매치가 쉬운 컬러입니다.",
    price: 56000,
    meta: { heart: 990, review: 214 },
    category: "하의",
    imageUrl:
      "https://plus.unsplash.com/premium_photo-1695575576052-7c271876b075?w=500&auto=format&fit=crop&q=60",
    size: ["90", "95", "100", "105", "110", "115", "120"],
  },
  {
    id: 21,
    name: "하버라인 오버핏 블레이저",
    description:
      "오버핏 실루엣으로 트렌디하면서도 체형 커버에 좋은 블레이저입니다. 어깨 패드는 과하지 않게 설계해 부담 없이 입을 수 있고, 셔츠/티셔츠 위에 걸치기만 해도 스타일이 완성됩니다.",
    price: 119000,
    meta: { heart: 811, review: 132 },
    category: "상의",
    imageUrl:
      "https://images.unsplash.com/photo-1559697242-a465f2578a95?w=500&auto=format&fit=crop&q=60",
    size: ["90", "95", "100", "105", "110", "115", "120"],
  },
  {
    id: 22,
    name: "코지윈터 비니",
    description:
      "촘촘한 니트 짜임으로 보온성을 높인 기본 비니입니다. 머리를 조이지 않는 텐션으로 장시간 착용해도 편안하고, 겨울 코디에 자연스럽게 어울리는 데일리 아이템입니다.",
    price: 22000,
    meta: { heart: 1402, review: 289 },
    category: "모자",
    imageUrl:
      "https://images.unsplash.com/photo-1576871337632-b9aef4c17ab9?w=500&auto=format&fit=crop&q=60",
    size: ["90", "95", "100", "105", "110", "115", "120"],
  },
  {
    id: 23,
    name: "썸머웨이브 샌들",
    description:
      "가벼운 EVA 소재로 물가에서도 부담 없이 신을 수 있는 샌들입니다. 발등 스트랩이 안정적으로 잡아주고, 장시간 착용에도 부담을 줄인 쿠션감으로 여행지/일상 모두 추천합니다.",
    price: 39000,
    meta: { heart: 760, review: 118 },
    category: "신발",
    imageUrl:
      "https://images.unsplash.com/photo-1603487742131-4160ec999306?w=500&auto=format&fit=crop&q=60",
    size: ["90", "95", "100", "105", "110", "115", "120"],
  },
  {
    id: 24,
    name: "버터크림 케이블 니트",
    description:
      "입체적인 케이블 패턴이 포인트인 니트로, 단독으로도 충분히 스타일이 살아납니다. 부드러운 촉감과 적당한 두께감으로 보온성을 챙겼고, 셔츠 레이어드에도 잘 어울립니다.",
    price: 68000,
    meta: { heart: 1025, review: 207 },
    category: "상의",
    imageUrl:
      "https://plus.unsplash.com/premium_photo-1673757116753-4184b1a1667f?w=500&auto=format&fit=crop&q=60",
    size: ["90", "95", "100", "105", "110", "115", "120"],
  },
  {
    id: 25,
    name: "스톤브릿지 트렌치 코트",
    description:
      "클래식한 트렌치 실루엣에 현대적인 디테일을 더한 코트입니다. 허리 벨트로 다양한 핏 연출이 가능하고, 생활 구김이 덜해 출근룩/격식 있는 자리에도 활용도가 높습니다.",
    price: 159000,
    meta: { heart: 588, review: 76 },
    category: "상의",
    imageUrl:
      "https://plus.unsplash.com/premium_photo-1674719144570-0728faf14f96?w=500&auto=format&fit=crop&q=60",
    size: ["90", "95", "100", "105", "110", "115", "120"],
  },
  {
    id: 26,
    name: "미스트라인 조거 팬츠",
    description:
      "부드러운 스웨트 원단으로 편안함을 극대화한 조거 팬츠입니다. 허리 밴딩이 안정적이며, 발목 시보리로 핏이 정돈되어 홈웨어는 물론 외출용 캐주얼룩에도 잘 어울립니다.",
    price: 42000,
    meta: { heart: 1760, review: 344 },
    category: "하의",
    imageUrl:
      "https://images.unsplash.com/photo-1706177208693-2e3c68e5f0f2?w=500&auto=format&fit=crop&q=60",
    size: ["90", "95", "100", "105", "110", "115", "120"],
  },
  {
    id: 27,
    name: "오프화이트 클래식 로퍼",
    description:
      "군더더기 없는 클래식 로퍼로, 세미 포멀 코디에 특히 잘 어울립니다. 쿠션 인솔로 착화감을 개선했고, 발등을 안정적으로 감싸는 패턴으로 벗겨짐을 줄였습니다.",
    price: 89000,
    meta: { heart: 690, review: 101 },
    category: "신발",
    imageUrl:
      "https://images.unsplash.com/photo-1556004583-d2aaffbba592?w=500&auto=format&fit=crop&q=60",
    size: ["90", "95", "100", "105", "110", "115", "120"],
  },
  {
    id: 28,
    name: "오프화이트 코튼 버킷햇",
    description:
      "탄탄한 코튼 원단과 적당한 챙 길이로 얼굴을 자연스럽게 커버해주는 버킷햇입니다. 캐주얼룩에 포인트가 되고, 계절 상관없이 데일리로 활용하기 좋은 디자인입니다.",
    price: 28000,
    meta: { heart: 940, review: 167 },
    category: "모자",
    imageUrl:
      "https://images.unsplash.com/photo-1648422204972-4278784a9863?w=500&auto=format&fit=crop&q=60",
    size: ["90", "95", "100", "105", "110", "115", "120"],
  },
  {
    id: 29,
    name: "블루밍 롱스커트",
    description:
      "풍성하게 퍼지는 A라인 실루엣으로 움직임이 예쁜 롱스커트입니다. 허리는 편안한 밴딩으로 마감했고, 블라우스/니트/맨투맨 등 다양한 상의와 코디가 쉬워 활용도가 높습니다.",
    price: 51000,
    meta: { heart: 1123, review: 238 },
    category: "하의",
    imageUrl:
      "https://plus.unsplash.com/premium_photo-1671379102281-7225f3d3d97d?w=500&auto=format&fit=crop&q=60",
    size: ["90", "95", "100", "105", "110", "115", "120"],
  },
  {
    id: 30,
    name: "오프화이트 레이어드 롱슬리브",
    description:
      "단독으로도, 반팔/니트 안에 레이어드용으로도 좋은 롱슬리브입니다. 원단이 탄탄해 늘어짐이 덜하고, 소매/밑단 기장이 적당해 다양한 스타일링에 쉽게 녹아듭니다.",
    price: 32000,
    meta: { heart: 1988, review: 455 },
    category: "상의",
    imageUrl:
      "https://plus.unsplash.com/premium_photo-1690034978688-dbdd03eab792?w=500&auto=format&fit=crop&q=60",
    size: ["90", "95", "100", "105", "110", "115", "120"],
  },
];

module.exports = { products };
