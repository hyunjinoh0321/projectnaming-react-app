import React from 'react'
import { BrowserRouter, Route, Routes } from 'react-router-dom'

import Home from "../pages/Home";
import GradeList from "../pages/GradeList";
import GradeAdd from "../pages/GradeAdd";
import GradeView from "../pages/GradeView";
import GradeEdit from "../pages/GradeEdit";
import WorkList from "../pages/WorkList";
import WorkAdd from "../pages/WorkAdd";
import WorkView from "../pages/WorkView";
import WorkEdit from "../pages/WorkEdit";
import RuleList from "../pages/RuleList";
import RuleAdd from "../pages/RuleAdd";
import RuleView from "../pages/RuleView";
import RuleEdit from "../pages/RuleEdit";

import VoiceOfCustomerList from "../pages/VoiceOfCustomerList";
import VoiceOfCustomerView from "../pages/VoiceOfCustomerView";
import VoiceOfCustomerEdit from "../pages/VoiceOfCustomerEdit";
import VoiceOfCustomerAdd from "../pages/VoiceOfCustomerAdd";

import MaratonList from "../pages/MaratonList";
import MaratonSearchList from "../pages/MaratonSearchList";
import MaratonAdd from "../pages/MaratonAdd";
import MaratonView from "../pages/MaratonView";
import MaratonEdit from "../pages/MaratonEdit";

import VersionList from "../pages/VersionList";
import VersionTest from "../pages/VersionTest";

import Layout from "./layout/layout";
import TestPage from "../pages/testpage";

const Routers = () => {
    return (
        <BrowserRouter>
            <Routes>
                <Route element={<Layout />}>
                    <Route path="/projectnaming"  element={<Home/>} />
                    <Route path="/projectnaming/grade/list"  element={<GradeList/>} />
                    <Route path="/projectnaming/grade/add"  element={<GradeAdd/>} />
                    <Route path="/projectnaming/grade/View/:id"  element={<GradeView/>} />
                    <Route path="/projectnaming/grade/Edit/:id"  element={<GradeEdit/>} />
                    <Route path="/projectnaming/work/list"  element={<WorkList/>} />
                    <Route path="/projectnaming/work/add"  element={<WorkAdd/>} />
                    <Route path="/projectnaming/work/View/:id"  element={<WorkView/>} />
                    <Route path="/projectnaming/work/Edit/:id"  element={<WorkEdit/>} />
                    <Route path="/projectnaming/rule/list"  element={<RuleList/>} />
                    <Route path="/projectnaming/rule/add"  element={<RuleAdd/>} />
                    <Route path="/projectnaming/rule/View/:id"  element={<RuleView/>} />
                    <Route path="/projectnaming/rule/Edit/:id"  element={<RuleEdit/>} />
                    <Route path="/projectnaming/voiceofcustomer/list"  element={<VoiceOfCustomerList/>} />
                    <Route path="/projectnaming/voiceofcustomer/add"  element={<VoiceOfCustomerAdd/>} />
                    <Route path="/projectnaming/voiceofcustomer/view/:id"  element={<VoiceOfCustomerView/>} />
                    <Route path="/projectnaming/voiceofcustomer/edit/:id"  element={<VoiceOfCustomerEdit/>} />
                    <Route path="/projectnaming/maraton/list"  element={<MaratonList/>} />
                    <Route path="/projectnaming/maraton/add"  element={<MaratonAdd/>} />
                    <Route path="/projectnaming/maraton/search/:name"  element={<MaratonSearchList/>} />
                    <Route path="/projectnaming/maraton/View/:id"  element={<MaratonView/>} />
                    <Route path="/projectnaming/maraton/Edit/:id"  element={<MaratonEdit/>} />
                    <Route path="/projectnaming/version/list"  element={<VersionList/>} />
                    <Route path="/projectnaming/version/test"  element={<VersionTest/>} />
                    <Route path="/projectnaming/test"  element={<TestPage/>} />
                </Route>    
            </Routes>
        </BrowserRouter>
    )
}

export default Routers