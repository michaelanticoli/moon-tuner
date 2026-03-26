import { useEffect } from "react";

export function MailerLiteEmbed() {
  useEffect(() => {
    // Inject MailerLite CSS
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
        #mlb2-39005996.ml-form-embedContainer .ml-form-embedWrapper.embedForm { max-width: 400px; width: 100%; }
        #mlb2-39005996.ml-form-embedContainer .ml-form-align-center { text-align: center; }
        #mlb2-39005996.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody,
        #mlb2-39005996.ml-form-embedContainer .ml-form-embedWrapper .ml-form-successBody {
          padding: 20px 20px 0 20px;
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
          margin: 0;
          padding: 10px 10px !important;
          width: 100% !important;
          box-sizing: border-box !important;
          max-width: 100% !important;
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
        #mlb2-39005996.ml-form-embedContainer .ml-form-embedWrapper .ml-form-embedBody .ml-form-formContent {
          margin: 0 0 20px 0;
          width: 100%;
        }
        .ml-error input { border-color: red !important; }
        .ml-error .label-description,
        .ml-error label:first-child { color: #ff0000 !important; }
        @media only screen and (max-width: 400px) {
          .ml-form-embedWrapper.embedForm { width: 100% !important; }
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
