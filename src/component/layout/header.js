import react from "react";
import { Link, useLocation } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'; 
import "./header.css";

const Header = () => {
    const location = useLocation();
    const navigate = useNavigate(); 
    const menus = [
        { to: '/', title: 'Home' },
        { to: '/about', title: 'About' },
        { to: '/login', title: 'Login' },
    ]

    const goToMaraton = () => {                                    // 3
        navigate('/projectnaming/maraton/list');
    };

    return (
        <header>
            <div className="container">
                <div className="card">
                    <div className="card-header">
                    <h1 className="text-center mt-1 mb-3"><font size="7" color="black" face="궁서체" >[DAOL투자증권] </font>
                    <font size="7" color="red" face="궁서체" >프로젝트 네이밍 채번</font></h1>
                    <p>
                    <Link to={`/projectnaming`} className="btn btn btn-success mx-1">호옴</Link>
                    <Link to={`/projectnaming/grade/list`} className="btn btn-secondary mx-1">등급 목록</Link>
                    <Link to={`/projectnaming/work/list`} className="btn btn-secondary mx-1">업무 목록</Link>
                    <Link to={`/projectnaming/rule/list`} className="btn btn-outline-success mx-1">프로젝트 네이밍 목록</Link>
                    <Link to={`/projectnaming/voiceofcustomer/list`} className="btn btn-danger mx-1">고객의 소리</Link>
                    <button className="btn btn-warning mx-1" onClick={goToMaraton}>          
                        마라톤 기록조회
                    </button>
                    <Link to={`/projectnaming/version/list`} className="btn btn-danger mx-1">서버버전처리</Link>
                    </p>
                    <p>
                    <Link to={`/projectnaming/version/test`} className="btn btn-danger mx-1">테스트</Link>    
                    </p>
                    </div>
                </div>         
            </div>
        </header>
    )
}

export default Header;