import { useState } from "react";
import { FiCheck, FiLink } from "react-icons/fi";
import {
  EmailShareButton,
  FacebookShareButton,
  LinkedinShareButton,
  TelegramShareButton,
  TwitterShareButton,
  WhatsappShareButton,
  FacebookIcon,
  EmailIcon,
  LinkedinIcon,
  WhatsappIcon,
  XIcon,
  TelegramIcon,
} from "react-share";

const SharePost = ({ title }) => {
  const shareUrl = typeof window !== "undefined" ? window.location.href : "";
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
      setTimeout(() => setCopied(false), 1500);
    } catch (err) {
      setCopied(false);
    }
  };

  return (
    <div>
      <h5 className="font-semibold">Share Post</h5>
      <div className="flex items-center flex-wrap gap-4 p-4">
        <FacebookShareButton url={shareUrl} quote={title}>
          <FacebookIcon round size={40} />
        </FacebookShareButton>
        <TwitterShareButton url={shareUrl} title={title}>
          <XIcon round size={40} />
        </TwitterShareButton>
        <LinkedinShareButton url={shareUrl} title={title}>
          <LinkedinIcon round size={40} />
        </LinkedinShareButton>
        <TelegramShareButton url={shareUrl} title={title}>
          <TelegramIcon round size={40} />
        </TelegramShareButton>
        <WhatsappShareButton url={shareUrl} title={title}>
          <WhatsappIcon round size={40} />
        </WhatsappShareButton>
        <EmailShareButton url={shareUrl} subject={title}>
          <EmailIcon round size={40} />
        </EmailShareButton>
        <button
          className="btn btn-primary rounded-full p-0 size-10 text-xl"
          onClick={handleCopy}
        >
          {copied ? <FiCheck className="text-success" /> : <FiLink />}
        </button>
      </div>
    </div>
  );
};

export default SharePost;
