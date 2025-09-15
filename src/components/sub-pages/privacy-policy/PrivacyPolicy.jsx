// src/pages/PrivacyPolicy.jsx
import React, { useMemo } from "react";
import {
  Box,
  Container,
  Typography,
  Chip,
  Divider,
  Grid,
  Link as MuiLink,
} from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import CheckCircleRoundedIcon from "@mui/icons-material/CheckCircleRounded";
import GppGoodRoundedIcon from "@mui/icons-material/GppGoodRounded";
import ShieldMoonRoundedIcon from "@mui/icons-material/ShieldMoonRounded";
import CookieRoundedIcon from "@mui/icons-material/CookieRounded";

import PrivacyHero from "./PrivacyHero"; // adjust path if needed

/* ---------------------------- Design Tokens ---------------------------- */
const ACCENT = "#339c5e";
const SURFACE = "#E8E5DD";
const INK = "#0e1113";

/* ------------------------------ Styled UI ------------------------------ */
const PageWrap = styled(Box)(({ theme }) => ({
  background: SURFACE,
  color: INK,
}));

const Overline = styled(Typography)({
  textTransform: "uppercase",
  letterSpacing: 2.5,
  fontWeight: 700,
  fontSize: 12,
  color: alpha(INK, 0.66),
});

const Title = styled(Typography)(({ theme }) => ({
  fontWeight: 900,
  letterSpacing: -0.5,
  lineHeight: 1.05,
  fontSize: "clamp(28px, 4vw, 42px)",
}));

const Anchor = styled("span")(() => ({
  position: "relative",
  top: "-96px",
}));

/* ------------------------------ Data Model ---------------------------- */
const sections = [
  {
    id: "what-we-collect",
    icon: <GppGoodRoundedIcon fontSize="small" />,
    title: "Information We Collect",
    body: (
      <>
        <Typography paragraph>
          We collect information you provide directly (for example: name, email, donation amount, messages you send us or forms you submit), as well as information collected automatically (such as device type, pages visited, and approximate location) through cookies and similar technologies.
        </Typography>
        <ul>
          <li>Account & contact details you share with us (e.g., when signing up, donating, or contacting us).</li>
          <li>Transaction data related to donations or purchases (processed securely by our payment provider; we do not store full card numbers).</li>
          <li>Usage data and analytics (pages viewed, session duration, referrers) to improve our programs and site accessibility.</li>
        </ul>
      </>
    ),
  },
  {
    id: "how-we-use",
    icon: <CheckCircleRoundedIcon fontSize="small" />,
    title: "How We Use Your Information",
    body: (
      <>
        <Typography paragraph>
          We use your information to operate our website and programs, process donations, communicate about events and initiatives, personalize content, measure performance, comply with legal obligations, and protect our community.
        </Typography>
        <ul>
          <li>Provide and improve services, including donor support and event registration.</li>
          <li>Send important updates and opportunities to get involved (you can opt out any time).</li>
          <li>Detect, prevent, or address fraud, abuse, or security issues.</li>
        </ul>
      </>
    ),
  },
  {
    id: "sharing",
    icon: <ShieldMoonRoundedIcon fontSize="small" />,
    title: "Sharing & Disclosure",
    body: (
      <>
        <Typography paragraph>
          We do not sell your personal information. We share data only with trusted service providers (e.g., payment processors, analytics, email tools) who act on our instructions and are bound by confidentiality and security obligations.
        </Typography>
        <Typography paragraph>
          We may also share information if required by law, to protect the rights and safety of our community, or with your direction and consent.
        </Typography>
      </>
    ),
  },
  {
    id: "cookies",
    icon: <CookieRoundedIcon fontSize="small" />,
    title: "Cookies & Tracking",
    body: (
      <>
        <Typography paragraph>
          We use cookies and similar technologies for core functionality (e.g., keeping you logged in), analytics, performance, and remembering preferences. You can control cookies in your browser settings. Disabling some cookies may affect site functionality.
        </Typography>
        <Typography paragraph>
          To opt out of analytics, you may use browser tools such as Do Not Track, built-in tracking protection, or third‑party opt‑outs offered by your browser.
        </Typography>
      </>
    ),
  },
  {
    id: "retention",
    icon: null,
    title: "Data Retention",
    body: (
      <Typography paragraph>
        We retain personal information only for as long as necessary to fulfill the purposes outlined in this policy, comply with our legal obligations, resolve disputes, and enforce our agreements.
      </Typography>
    ),
  },
  {
    id: "your-rights",
    icon: null,
    title: "Your Privacy Rights",
    body: (
      <>
        <Typography paragraph>
          Depending on your location, you may have rights to access, correct, delete, or port your information, and to object to or restrict certain processing. You may also opt out of marketing communications at any time.
        </Typography>
        <Typography paragraph>
          To exercise rights, contact us using the details below. We will verify your request and respond within the timeframes required by applicable law.
        </Typography>
      </>
    ),
  },
  {
    id: "children",
    icon: null,
    title: "Children’s Privacy",
    body: (
      <Typography paragraph>
        Our website is intended for general audiences and not directed to children under 13. We do not knowingly collect personal information from children under 13 without appropriate consent.
      </Typography>
    ),
  },
  {
    id: "security",
    icon: null,
    title: "Security",
    body: (
      <Typography paragraph>
        We use administrative, technical, and physical safeguards designed to protect personal information. However, no method of transmission or storage is completely secure.
      </Typography>
    ),
  },
  {
    id: "changes",
    icon: null,
    title: "Changes to This Policy",
    body: (
      <Typography paragraph>
        We may update this Privacy Policy from time to time. We will post the updated date at the top of this page and, if changes are material, provide additional notice.
      </Typography>
    ),
  },
  {
    id: "contact",
    icon: null,
    title: "Contact Us",
    body: (
      <Typography>
        Questions or requests? Reach us at <MuiLink href="mailto:reachout@seanclark21foundation.org">reachout@seanclark21foundation.org</MuiLink> or by mail at: Sean Clark 21 Foundation, Dallas, TX.
      </Typography>
    ),
  },
];

/* ------------------------------ Component ----------------------------- */
const PrivacyPolicy = () => {
  const today = useMemo(() => new Date().toISOString().slice(0, 10), []);

  return (
    <PageWrap>
      <PrivacyHero title="Privacy Policy" subtitle="Your trust matters. Here’s how we protect your data." />
      <Container maxWidth="lg">
        <Overline>Effective date</Overline>
        <Title component="h1" sx={{ mt: 0.5 }}>Privacy Policy</Title>
        <Typography sx={{ mt: 1.5, color: alpha(INK, 0.85) }}>Last updated: {today}</Typography>
        <Typography sx={{ mt: 2, fontSize: { xs: 16, md: 18 }, lineHeight: 1.65 }}>
          This Privacy Policy explains how the Sean Clark 21 Foundation collects, uses, and protects information when you interact with our website, programs, donations, and events.
        </Typography>

        <Divider sx={{ my: 4, borderColor: alpha('#000', 0.1) }} />

        {/* Table of Contents */}
        <Grid container spacing={1.5} sx={{ mb: 4 }}>
          {sections.map((s) => (
            <Grid item key={s.id}>
              <Chip
                icon={s.icon || <CheckCircleRoundedIcon />}
                label={s.title}
                component="a"
                clickable
                href={`#${s.id}`}
                sx={{
                  borderRadius: 10,
                  bgcolor: alpha(ACCENT, 0.08),
                  color: ACCENT,
                  border: `1px solid ${alpha(ACCENT, 0.25)}`,
                  fontWeight: 600,
                  "&:hover": { bgcolor: alpha(ACCENT, 0.12) },
                }}
              />
            </Grid>
          ))}
        </Grid>

        {/* Sections */}
        {sections.map((s) => (
          <Box key={s.id} sx={{ pb: 5 }}>
            <Anchor id={s.id} />
            <Typography variant="h5" sx={{ fontWeight: 800, mb: 1.5 }}>
              {s.title}
            </Typography>
            {s.body}
          </Box>
        ))}
      </Container>
    </PageWrap>
  );
};

export default PrivacyPolicy;
