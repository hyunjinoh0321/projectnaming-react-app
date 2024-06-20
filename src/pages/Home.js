import React from 'react';
import { Link } from "react-router-dom";

export default function Home() {
  return (
    <div className="container">
      <div className="card">
        <div className="card-header">
          <h2 className="text-center mt-5 mb-3">메뉴를 눌러 주세요</h2>
          <h3 className="text-center mt-1">*** Update 내역 ***</h3>
          <h5 className="text-center mt-1">2024.05.31 : 게시판 사진 입력기능 삭제</h5>
          <h5 className="text-center mt-1">2024.06.07 : 프로젝트 네이밍룰 번호 정렬 처리</h5>
          <h5 className="text-center mt-1">2024.06.07 : 마라톤 기록 조회/저장/수정/검색 개발 완료</h5>
          <br />
          <br />
          <h3 className="text-center mt-1">*** 개발 예정 내역 ***</h3>
          <h5 className="text-center mt-1">2024.6월중 : 버전처리 요청</h5>
          <br />
          <br />
          <h3 className="text-center mt-1">*** 공지사항 ***</h3>
          <h5 className="text-center mt-1">급한 요구사항은 네이트온 or 카카오톡 문의</h5>
          <h5 className="text-center mt-1">TEL : 02-2184-2237</h5>
        </div>
      </div>         
    </div>
  );
}