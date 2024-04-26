import { Route, Routes } from "react-router-dom";
import NotificationPage from "./pages/NotificationPage/NotificationPage";
import MytaskPage from "./pages/MyTaskPage/MytaskPage";
import HomePage from "./pages/HomePage/HomePage";
import SignUpPage from "./pages/AuthPage/SignUpPage";
import SignInPage from "./pages/AuthPage/SignInPage";
import PrivateRoute from "./layouts/PrivateRoute";
import PublicRoute from "./layouts/PublicRoute";
import VerifyEmailPage from "./pages/AuthPage/VerifyEmailPage";
import ForgotPasswordPage from "./pages/AuthPage/ForgotPasswordPage";
import NotFoundPage from "./pages/NotFoundPage";
import AllMyProjectPage from "./pages/AllMyProjectPage/AllMyProjectPage";
import List from "./pages/ProjectPage/List/List";
import ProjectPage from "./pages/ProjectPage/ProjectPage";
import Board from "./pages/ProjectPage/Board/Board";
import Calendar from "./pages/ProjectPage/Calendar/Calendar";
import Timeline from "./pages/ProjectPage/Timeline/Timeline";
import InvitePage from "./pages/InvitePage/InvitePage";
import { MessagePayload, onMessage } from "firebase/messaging";
import { useState, useEffect } from "react";
import { ToastContainer, toast } from "react-toastify";
import {
  requestNotificationPermission,
  onMessageListener,
  messaging,
} from "./Firebase";

function App() {
  const [show, setShow] = useState(false);
  const [notification, setNotification] = useState({ title: "", body: "" });

  useEffect(() => {
    requestNotificationPermission();
    onMessageListener()
      .then((payload) => {
        console.log(payload);
        console.log("==========");
        setShow(true);
        setNotification({
          title: "notification?.title as string",
          body: "notification?.body as string",
        });
        console.log("Payload:", payload);
        alert("test");
      })
      .catch((err) => console.log("failed: ", err));
  }, []);

  if (show) {
    toast.success("Show!!!");
  }

  onMessage(messaging, (payload: MessagePayload) => {
    console.log("Message received. Payload:", payload as MessagePayload);
    toast.success("Show!!!");
  });

  return (
    <Routes>
      <Route element={<PublicRoute />}>
        <Route path="/sign-in" element={<SignInPage />} />
        <Route path="/sign-up" element={<SignUpPage />} />
        <Route path="/verify-email" element={<VerifyEmailPage />} />
        <Route path="/forgot-password" element={<ForgotPasswordPage />} />
      </Route>
      <Route element={<PrivateRoute />}>
        <Route path="/join-project" element={<InvitePage />} />
        <Route path="/" element={<HomePage />} />
        <Route path="/mytask" element={<MytaskPage />} />
        <Route path="/notification" element={<NotificationPage />} />
        <Route path="/projects" element={<AllMyProjectPage />} />
        <Route path="/projects/:projectId/" element={<ProjectPage />}>
          <Route path="list" element={<List />} />
          <Route path="board" element={<Board />} />
          <Route path="timeline" element={<Timeline />} />
          <Route path="calendar" element={<Calendar />} />
        </Route>
      </Route>
      <Route path="*" element={<NotFoundPage />} />
    </Routes>
  );
}

export default App;
