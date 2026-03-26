import { useEffect } from "react";

export function MailerLiteEmbed() {
  useEffect(() => {
    // Inject MailerLite fonts CSS
    const styleId = "mailerlite-fonts";
    if (!document.getElementById(styleId)) {
      const link = document.createElement("link");
      link.id = styleId;
      link.rel = "stylesheet";
      link.href = "https://assets.mlcdn.com/fonts.css?version=1774431";
      document.head.appendChild(link);
    }

    // Inject MailerLite universal script
    const scriptId = "mailerlite-universal";
    if (!document.getElementById(scriptId)) {
      const script = document.createElement("script");
      script.id = scriptId;
      script.src = "https://assets.mailerlite.com/jsonp/1519095/forms/158624073843804617/subscribe.js";
      script.async = true;
      document.body.appendChild(script);
    }

    // Inject webforms script
    const wfScriptId = "mailerlite-webforms";
    if (!document.getElementById(wfScriptId)) {
      const script = document.createElement("script");
      script.id = wfScriptId;
      script.src = "https://groot.mailerlite.com/js/w/webforms.min.js?v3e6bcfcc16a5f5c61b0a59f48a08e2fd";
      script.async = true;
      document.body.appendChild(script);
    }
  }, []);

  return (
    <>
      <style>{`
        .ml-form-embedSubmitLoad {
          display: inline-block;
          width: 20px;
          height: 20px;
        }
        .g-recaptcha {
          transform: scale(1);
          -webkit-transform: scale(1);
          transform-origin: 0 0;
          -webkit-transform-origin: 0 0;
        }
        .sr-only {
          position: absolute;
          width: 1px;
          height: 1px;
          padding: 0;
          margin: -1px;
          overflow: hidden;
          clip: rect(0,0,0,0);
          border: 0;
        }
        .ml-form-embedSubmitLoad:after {
          content: " ";
          display: block;
          width: 11px;
          height: 11px;
          margin: 1px;
          border-radius: 50%;
          border: 4px solid #fff;
          border-color: #ffffff #ffffff #ffffff transparent;
          animation: ml-form-embedSubmitLoad 1.2s linear infinite;
        }
        @keyframes ml-form-embedSubmitLoad {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
        #mlb2-39005996.ml-form-embedContainer {
          box-sizing: border-box;
          display: table;
          margin: 0 auto;
          position: static;
          width: 100% !important;
        }
        #mlb2-39005996.ml-form-embedContainer h4,
        #mlb2-39005996.ml-form-embedContainer p,
        #mlb2-39005996.ml-form-embedContainer span,
        #mlb2-39005996.ml-form-embedContainer button {
          text-transform: none !important;
          letter-spacing: normal !important;
        }
        #mlb2-39005996.ml-form-embedContainer .ml-form-embedWrapper {
          background-color: #fafafa;
          border-width: 0px;
          border-color: transparent;
          border-radius: 4px;
          border-style: solid;
          box-sizing: border-box;
          display: inline-block !important;
          margin: 0;
          padding: 0;
          position: relative;
        }
        #mlb2-39005996.ml-form-embedContainer .ml-form-embedWrapper.embedPopup,
        #mlb2-39005996.ml-form-embedContainer .ml-form-embedWrapper.embedDefault { width: 400px; }
        #mlb2-39005996.ml-form-embedContainer .ml-form-embedWrapper.embedForm { max-width: 400px; width: 100%; }
        #mlb2-39005996.ml-form-embedContainer .ml-form-align-left { text-align: left; }
        #mlb2-39005996.ml-form-embedContainer .ml-form-align-center { text-align: center; }
        #mlb2-39005996.ml-form-embedContainer .ml-form-align-default { display: table-cell !important; vertical-align: middle !important; text-align: center !important; }
        #mlb2-39005996.ml-form-embedContainer .ml-form-align-right { text-align: right; }
        #mlb2-39005996.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedHeader img {
          border-top-left-radius: 4px;
          border-top-right-radius: 4px;
          height: auto;
          margin: 0 auto !important;
          max-width: 100%;
          width: 2137px;
        }
        #mlb2-39005996.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody,
        #mlb2-39005996.ml-form-embedContainer .ml-form-embedWrapper .ml-form-successBody {
          padding: 20px 20px 0 20px;
        }
        #mlb2-39005996.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody.ml-form-embedBodyHorizontal {
          padding-bottom: 0;
        }
        #mlb2-39005996.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-embedContent,
        #mlb2-39005996.ml-form-embedContainer .ml-form-embedWrapper .ml-form-successBody .ml-form-successContent {
          text-align: left;
          margin: 0 0 20px 0;
        }
        #mlb2-39005996.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-embedContent h4,
        #mlb2-39005996.ml-form-embedContainer .ml-form-embedWrapper .ml-form-successBody .ml-form-successContent h4 {
          color: #000000;
          font-family: 'Playfair Display', sans-serif;
          font-size: 30px;
          font-weight: 400;
          margin: 0 0 10px 0;
          text-align: center;
          word-break: break-word;
        }
        #mlb2-39005996.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-embedContent p,
        #mlb2-39005996.ml-form-embedContainer .ml-form-embedWrapper .ml-form-successBody .ml-form-successContent p {
          color: #000000;
          font-family: 'Open Sans', Arial, Helvetica, sans-serif;
          font-size: 14px;
          font-weight: 400;
          line-height: 20px;
          margin: 0 0 10px 0;
          text-align: left;
        }
        #mlb2-39005996.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-embedContent ul,
        #mlb2-39005996.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-embedContent ol,
        #mlb2-39005996.ml-form-embedContainer .ml-form-embedWrapper .ml-form-successBody .ml-form-successContent ul,
        #mlb2-39005996.ml-form-embedContainer .ml-form-embedWrapper .ml-form-successBody .ml-form-successContent ol {
          color: #000000;
          font-family: 'Open Sans', Arial, Helvetica, sans-serif;
          font-size: 14px;
        }
        #mlb2-39005996.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-embedContent p a,
        #mlb2-39005996.ml-form-embedContainer .ml-form-embedWrapper .ml-form-successBody .ml-form-successContent p a {
          color: #000000;
          text-decoration: underline;
        }
        #mlb2-39005996.ml-form-embedContainer .ml-form-embedWrapper .ml-block-form .ml-field-group {
          text-align: left !important;
        }
        #mlb2-39005996.ml-form-embedContainer .ml-form-embedWrapper .ml-block-form .ml-field-group label {
          margin-bottom: 5px;
          color: #333333;
          font-size: 14px;
          font-family: 'Open Sans', Arial, Helvetica, sans-serif;
          font-weight: bold;
          font-style: normal;
          text-decoration: none;
          display: inline-block;
          line-height: 20px;
        }
        #mlb2-39005996.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-embedContent p:last-child,
        #mlb2-39005996.ml-form-embedContainer .ml-form-embedWrapper .ml-form-successBody .ml-form-successContent p:last-child {
          margin: 0;
        }
        #mlb2-39005996.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody form {
          margin: 0;
          width: 100%;
        }
        #mlb2-39005996.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-formContent,
        #mlb2-39005996.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-checkboxRow {
          margin: 0 0 20px 0;
          width: 100%;
        }
        #mlb2-39005996.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-checkboxRow {
          float: left;
        }
        #mlb2-39005996.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-formContent.horozintalForm {
          margin: 0;
          padding: 0 0 20px 0;
          width: 100%;
          height: auto;
          float: left;
        }
        #mlb2-39005996.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-fieldRow {
          margin: 0 0 10px 0;
          width: 100%;
        }
        #mlb2-39005996.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-fieldRow.ml-last-item {
          margin: 0;
        }
        #mlb2-39005996.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-fieldRow input {
          background-color: #ffffff !important;
          color: #333333 !important;
          border-color: #cccccc;
          border-radius: 4px !important;
          border-style: solid !important;
          border-width: 1px !important;
          font-family: 'Open Sans', Arial, Helvetica, sans-serif;
          font-size: 14px !important;
          height: auto;
          line-height: 21px !important;
          margin-bottom: 0;
          margin-top: 0;
          margin-left: 0;
          margin-right: 0;
          padding: 10px 10px !important;
          width: 100% !important;
          box-sizing: border-box !important;
          max-width: 100% !important;
        }
        #mlb2-39005996.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-fieldRow input::-webkit-input-placeholder,
        #mlb2-39005996.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-horizontalRow input::-webkit-input-placeholder { color: #333333; }
        #mlb2-39005996.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-fieldRow input::-moz-placeholder,
        #mlb2-39005996.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-horizontalRow input::-moz-placeholder { color: #333333; }
        #mlb2-39005996.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-fieldRow input:-ms-input-placeholder,
        #mlb2-39005996.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-horizontalRow input:-ms-input-placeholder { color: #333333; }
        #mlb2-39005996.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-fieldRow textarea,
        #mlb2-39005996.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-horizontalRow textarea {
          background-color: #ffffff !important;
          color: #333333 !important;
          border-color: #cccccc;
          border-radius: 4px !important;
          border-style: solid !important;
          border-width: 1px !important;
          font-family: 'Open Sans', Arial, Helvetica, sans-serif;
          font-size: 14px !important;
          height: auto;
          line-height: 21px !important;
          margin-bottom: 0;
          margin-top: 0;
          padding: 10px 10px !important;
          width: 100% !important;
          box-sizing: border-box !important;
          max-width: 100% !important;
        }
        #mlb2-39005996.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-fieldRow .custom-radio .custom-control-label::before,
        #mlb2-39005996.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-horizontalRow .custom-radio .custom-control-label::before,
        #mlb2-39005996.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-fieldRow .custom-checkbox .custom-control-label::before,
        #mlb2-39005996.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-horizontalRow .custom-checkbox .custom-control-label::before,
        #mlb2-39005996.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-embedPermissions .ml-form-embedPermissionsOptionsCheckbox .label-description::before,
        #mlb2-39005996.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-interestGroupsRow .ml-form-interestGroupsRowCheckbox .label-description::before,
        #mlb2-39005996.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-checkboxRow .label-description::before {
          border-color: #cccccc !important;
          background-color: #ffffff !important;
        }
        #mlb2-39005996.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-fieldRow input.custom-control-input[type="checkbox"] {
          box-sizing: border-box;
          padding: 0;
          position: absolute;
          z-index: -1;
          opacity: 0;
          margin-top: 5px;
          margin-left: -1.5rem;
          overflow: visible;
        }
        #mlb2-39005996.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-fieldRow .custom-checkbox .custom-control-label::before,
        #mlb2-39005996.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-horizontalRow .custom-checkbox .custom-control-label::before,
        #mlb2-39005996.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-embedPermissions .ml-form-embedPermissionsOptionsCheckbox .label-description::before,
        #mlb2-39005996.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-interestGroupsRow .ml-form-interestGroupsRowCheckbox .label-description::before,
        #mlb2-39005996.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-checkboxRow .label-description::before {
          border-radius: 4px !important;
        }
        #mlb2-39005996.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-checkboxRow input[type=checkbox]:checked~.label-description::after,
        #mlb2-39005996.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-embedPermissions .ml-form-embedPermissionsOptionsCheckbox input[type=checkbox]:checked~.label-description::after,
        #mlb2-39005996.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-fieldRow .custom-checkbox .custom-control-input:checked~.custom-control-label::after,
        #mlb2-39005996.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-horizontalRow .custom-checkbox .custom-control-input:checked~.custom-control-label::after,
        #mlb2-39005996.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-interestGroupsRow .ml-form-interestGroupsRowCheckbox input[type=checkbox]:checked~.label-description::after {
          background-image: url("data:image/svg+xml,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 8 8'%3e%3cpath fill='%23fff' d='M6.564.75l-3.59 3.612-1.538-1.55L0 4.26 2.974 7.25 8 2.193z'/%3e%3c/svg%3e");
        }
        #mlb2-39005996.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-fieldRow .custom-radio .custom-control-input:checked~.custom-control-label::before,
        #mlb2-39005996.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-horizontalRow .custom-radio .custom-control-input:checked~.custom-control-label::before,
        #mlb2-39005996.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-fieldRow .custom-checkbox .custom-control-input:checked~.custom-control-label::before,
        #mlb2-39005996.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-horizontalRow .custom-checkbox .custom-control-input:checked~.custom-control-label::before,
        #mlb2-39005996.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-embedPermissions .ml-form-embedPermissionsOptionsCheckbox input[type=checkbox]:checked~.label-description::before,
        #mlb2-39005996.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-interestGroupsRow .ml-form-interestGroupsRowCheckbox input[type=checkbox]:checked~.label-description::before,
        #mlb2-39005996.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-checkboxRow input[type=checkbox]:checked~.label-description::before {
          border-color: #000000 !important;
          background-color: #000000 !important;
        }
        #mlb2-39005996.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-horizontalRow {
          height: auto;
          width: 100%;
          float: left;
        }
        .ml-form-formContent.horozintalForm .ml-form-horizontalRow .ml-input-horizontal { width: 70%; float: left; }
        .ml-form-formContent.horozintalForm .ml-form-horizontalRow .ml-button-horizontal { width: 30%; float: left; }
        .ml-form-formContent.horozintalForm .ml-form-horizontalRow .ml-button-horizontal.labelsOn { padding-top: 25px; }
        .ml-form-formContent.horozintalForm .ml-form-horizontalRow .horizontal-fields { box-sizing: border-box; float: left; padding-right: 10px; }
        #mlb2-39005996.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-horizontalRow input {
          background-color: #ffffff;
          color: #333333;
          border-color: #cccccc;
          border-radius: 4px;
          border-style: solid;
          border-width: 1px;
          font-family: 'Open Sans', Arial, Helvetica, sans-serif;
          font-size: 14px;
          line-height: 20px;
          margin-bottom: 0;
          margin-top: 0;
          padding: 10px 10px;
          width: 100%;
          box-sizing: border-box;
          overflow-y: initial;
        }
        #mlb2-39005996.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-horizontalRow button {
          background-color: #000000 !important;
          border-color: #000000;
          border-style: solid;
          border-width: 1px;
          border-radius: 6px;
          box-shadow: none;
          color: #ffffff !important;
          cursor: pointer;
          font-family: 'Oxygen', sans-serif;
          font-size: 14px !important;
          font-weight: 700;
          line-height: 20px;
          margin: 0 !important;
          padding: 10px !important;
          width: 100%;
          height: auto;
        }
        #mlb2-39005996.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-horizontalRow button:hover {
          background-color: #333333 !important;
          border-color: #333333 !important;
        }
        #mlb2-39005996.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-checkboxRow input[type="checkbox"] {
          box-sizing: border-box;
          padding: 0;
          position: absolute;
          z-index: -1;
          opacity: 0;
          margin-top: 5px;
          margin-left: -1.5rem;
          overflow: visible;
        }
        #mlb2-39005996.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-checkboxRow .label-description {
          color: #000000;
          display: block;
          font-family: 'Open Sans', Arial, Helvetica, sans-serif;
          font-size: 12px;
          text-align: left;
          margin-bottom: 0;
          position: relative;
          vertical-align: top;
        }
        #mlb2-39005996.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-checkboxRow label {
          font-weight: normal;
          margin: 0;
          padding: 0;
          position: relative;
          display: block;
          min-height: 24px;
          padding-left: 24px;
        }
        #mlb2-39005996.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-checkboxRow label a {
          color: #000000;
          text-decoration: underline;
        }
        #mlb2-39005996.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-checkboxRow label p {
          color: #000000 !important;
          font-family: 'Open Sans', Arial, Helvetica, sans-serif !important;
          font-size: 12px !important;
          font-weight: normal !important;
          line-height: 18px !important;
          padding: 0 !important;
          margin: 0 5px 0 0 !important;
        }
        #mlb2-39005996.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-embedSubmit {
          margin: 0 0 20px 0;
          float: left;
          width: 100%;
        }
        #mlb2-39005996.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-embedSubmit button {
          background-color: #000000 !important;
          border: none !important;
          border-radius: 6px !important;
          box-shadow: none !important;
          color: #ffffff !important;
          cursor: pointer;
          font-family: 'Oxygen', sans-serif !important;
          font-size: 14px !important;
          font-weight: 700 !important;
          line-height: 21px !important;
          height: auto;
          padding: 10px !important;
          width: 100% !important;
          box-sizing: border-box !important;
        }
        #mlb2-39005996.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-embedSubmit button.loading {
          display: none;
        }
        #mlb2-39005996.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-embedSubmit button:hover {
          background-color: #333333 !important;
        }
        .ml-subscribe-close {
          width: 30px;
          height: 30px;
          background: url('https://assets.mlcdn.com/ml/images/default/modal_close.png') no-repeat;
          background-size: 30px;
          cursor: pointer;
          margin-top: -10px;
          margin-right: -10px;
          position: absolute;
          top: 0;
          right: 0;
        }
        .ml-error input, .ml-error textarea, .ml-error select {
          border-color: red !important;
        }
        .ml-error .custom-checkbox-radio-list {
          border: 1px solid red !important;
          border-radius: 4px;
          padding: 10px;
        }
        .ml-error .label-description,
        .ml-error .label-description p,
        .ml-error .label-description p a,
        .ml-error label:first-child {
          color: #ff0000 !important;
        }
        #mlb2-39005996.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-checkboxRow.ml-error .label-description p,
        #mlb2-39005996.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-checkboxRow.ml-error .label-description p:first-letter {
          color: #ff0000 !important;
        }
        @media only screen and (max-width: 400px) {
          .ml-form-embedWrapper.embedDefault, .ml-form-embedWrapper.embedPopup { width: 100% !important; }
          .ml-form-formContent.horozintalForm { float: left !important; }
          .ml-form-formContent.horozintalForm .ml-form-horizontalRow { height: auto !important; width: 100% !important; float: left !important; }
          .ml-form-formContent.horozintalForm .ml-form-horizontalRow .ml-input-horizontal { width: 100% !important; }
          .ml-form-formContent.horozintalForm .ml-form-horizontalRow .ml-input-horizontal > div { padding-right: 0px !important; padding-bottom: 10px; }
          .ml-form-formContent.horozintalForm .ml-button-horizontal { width: 100% !important; }
          .ml-form-formContent.horozintalForm .ml-button-horizontal.labelsOn { padding-top: 0px !important; }
        }
      `}</style>

      <div
        id="mlb2-39005996"
        className="ml-form-embedContainer ml-subscribe-form ml-subscribe-form-39005996"
      >
        <div className="ml-form-align-center">
          <div className="ml-form-embedWrapper embedForm">
            <div className="ml-form-embedBody ml-form-embedBodyDefault row-form">
              <div className="ml-form-embedContent">
                <h4>Lunar Dispatch</h4>
                <p>Phase-Based Guidance for Every Cycle</p>
              </div>
              <form
                className="ml-block-form"
                action="https://assets.mailerlite.com/jsonp/1519095/forms/158624073843804617/subscribe"
                data-code=""
                method="post"
                target="_blank"
              >
                <div className="ml-form-formContent">
                  <div className="ml-form-fieldRow ml-last-item">
                    <div className="ml-field-group ml-field-email ml-validate-email ml-validate-required">
                      <input
                        aria-label="email"
                        aria-required="true"
                        type="email"
                        className="form-control"
                        data-inputmask=""
                        name="fields[email]"
                        placeholder="Email Address"
                        autoComplete="email"
                      />
                    </div>
                  </div>
                </div>
                <input type="hidden" name="ml-submit" value="1" />
                <div className="ml-form-embedSubmit">
                  <button type="submit" className="primary">
                    Subscribe
                  </button>
                  <button disabled className="loading" style={{ display: "none" }}>
                    <div className="ml-form-embedSubmitLoad">
                      <div></div>
                    </div>
                    <span className="sr-only">Loading...</span>
                  </button>
                </div>
                <input type="hidden" name="anticsrf" value="true" />
              </form>
            </div>
            <div className="ml-form-successBody row-success" style={{ display: "none" }}>
              <div className="ml-form-successContent">
                <h4>Thank you!</h4>
                <p>You have successfully joined the Lunar Dispatch.</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
