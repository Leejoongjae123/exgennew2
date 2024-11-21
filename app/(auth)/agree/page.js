import React from "react";

function page() {
  return (
    <div className="w-full h-full">
      <h1>개인정보처리방침</h1>
      <p>
        본 사이트는 귀하의 개인정보보호를 매우 중요시하며,
        『정보통신망이용촉진등에관한법률』상의 개인정보보호 규정 및 정보통신부가
        제정한 『개인정보보호지침』을 준수하고 있습니다.
      </p>
      <p>본 방침은 2024년 09월 01일부터 시행합니다.</p>

      <h2>제1조 총칙</h2>
      <p>
        본 사이트는 개인정보보호방침을 통해 귀하께서 제공하시는 개인정보가
        어떠한 용도와 방식으로 이용되고 있으며 개인정보보호를 위해 어떠한 조치가
        취해지고 있는지 알려드립니다. 개인정보보호방침은 홈페이지 첫 화면 하단에
        공개합니다.
      </p>

      <h2>제2조 개인정보 수집에 대한 동의</h2>
      <p>
        귀하께서는 본 사이트의 개인정보보호방침 또는 이용약관의 내용에 대해 동의
        여부를 선택할 수 있습니다. 「동의한다」 버튼을 클릭하면 개인정보 수집에
        동의한 것으로 봅니다.
      </p>

      <h2>제3조 개인정보의 수집 및 이용목적</h2>
      <ul>
        <li>서비스 제공을 위한 계약의 성립</li>
        <li>서비스 이행 (수익금 정산, 지급 및 세금신고 등)</li>
        <li>회원 관리</li>
        <li>새로운 서비스, 이벤트 정보 안내</li>
      </ul>
      <p>단, 민감한 개인정보는 수집하지 않습니다.</p>

      <h2>제4조 수집하는 개인정보 항목</h2>
      <ul>
        <li>수집항목: 이름, 생년월일, 성별, 로그인ID, 비밀번호, 전화번호 등</li>
        <li>수집방법: 홈페이지(회원가입)</li>
      </ul>

      <h2>제5조 개인정보 자동수집 장치</h2>
      <p>
        쿠키를 사용하여 사용자 접속 정보를 저장 및 분석합니다. 쿠키 설정은 웹
        브라우저 옵션에서 변경 가능합니다.
      </p>

      <h2>제6조 목적 외 사용 및 제3자 제공</h2>
      <p>
        귀하의 개인정보를 제3자에게 제공하거나 공유하기 전에 사전 동의를
        구합니다. 단, 법령에 따른 경우는 예외입니다.
      </p>

      <h2>제7조 개인정보의 열람 및 정정</h2>
      <p>
        귀하는 언제든지 개인정보를 열람, 정정할 수 있으며 오류 정정 요청 시 처리
        완료 전까지 개인정보를 이용하지 않습니다.
      </p>

      <h2>제8조 개인정보 수집, 이용, 제공에 대한 동의 철회</h2>
      <p>동의 철회는 "마이페이지" 또는 이메일을 통해 가능합니다.</p>

      <h2>제9조 개인정보의 보유 및 이용기간</h2>
      <p>
        원칙적으로 개인정보 수집 및 이용 목적이 달성된 후에는 파기합니다. 단,
        관련 법령에 따라 일정 기간 보존합니다.
      </p>

      <h2>제10조 개인정보의 파기절차 및 방법</h2>
      <p>수집된 개인정보는 목적 달성 후 별도 DB로 이동 후 파기됩니다.</p>

      <h2>제11조 아동의 개인정보 보호</h2>
      <p>만14세 미만 아동의 개인정보 수집 시 법정대리인의 동의를 받습니다.</p>

      <h2>제12조 개인정보 보호를 위한 기술적 대책</h2>
      <p>
        암호화, 백신프로그램, 방화벽 등의 보안 대책을 마련하여 개인정보를
        보호합니다.
      </p>

      <h2>제13조 개인정보의 위탁처리</h2>
      <p>
        서비스 향상을 위해 개인정보를 외부에 위탁 처리할 수 있으며, 사전에 고지
        후 동의를 구합니다.
      </p>

      <h2>제14조 개인정보 관리 책임자</h2>
      <ul>
        <li>책임자 성명: 신주원</li>
        <li>전화번호: 010-9932-3659</li>
      </ul>
      <p>기타 개인정보 침해신고는 아래 기관에 문의하십시오:</p>
      <ul>
        <li>
          개인정보 침해신고센터: 국번 없이 118 (
          <a href="https://privacy.kisa.or.kr" target="_blank">
            privacy.kisa.or.kr
          </a>
          )
        </li>
        <li>
          경찰청 사이버안전국: 국번 없이 182 (
          <a href="https://cyberbureau.police.go.kr" target="_blank">
            cyberbureau.police.go.kr
          </a>
          )
        </li>
      </ul>
    </div>
  );
}

export default page;