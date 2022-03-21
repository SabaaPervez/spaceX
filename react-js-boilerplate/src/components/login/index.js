import React from "react";
import { useTranslation } from "react-i18next";
import { addItem } from "../../services/storage-service";
import APP_CONSTANTS from "../../constants/app-constants";
import "./styles.css";

function Login() {
  const { t } = useTranslation();

  const login = () => {
    addItem(APP_CONSTANTS.ACCESS_TOKEN, "TEST_TOKEN");

    location.reload();
  };

  return (
    <div className="login-page">
      <div className="login-header">{t("login")}</div>

      <button className="login-btn" onClick={login}>
        {t("login")}
      </button>
    </div>
  );
}

export default Login;
