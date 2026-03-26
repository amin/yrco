import React from "react";
import {
  Html,
  Head,
  Body,
  Container,
  Heading,
  Text,
  Section,
  Row,
  Column,
  Hr,
  Preview,
} from "@react-email/components";

const e = React.createElement;

export default function WelcomeEmail({ firstName, words = [] }) {
  return e(
    Html,
    null,
    e(Head, null),
    e(Preview, null, `Welcome to Colyr, ${firstName}!`),
    e(
      Body,
      { style: body },
      e(
        Container,
        { style: container },
        e(Section, { style: header }, e(Heading, { style: logo }, "colyr")),
        e(
          Section,
          { style: hero },
          e(Heading, { style: heroHeading }, `Welcome, ${firstName} \uD83D\uDC4B`),
          e(
            Text,
            { style: heroText },
            "Your profile is live. People can now discover you and connect based on the words that describe you."
          )
        ),
        e(Hr, { style: divider }),
        words.length > 0 &&
          e(
            Section,
            { style: wordsSection },
            e(Text, { style: sectionLabel }, "Your words"),
            e(
              Row,
              { style: pillsRow },
              ...words.map((w) =>
                e(
                  Column,
                  { key: w.word, style: pillColumn },
                  e("span", { style: { ...pill, backgroundColor: w.color } }, w.word)
                )
              )
            )
          ),
        e(Hr, { style: divider }),
        e(
          Section,
          null,
          e(
            Text,
            { style: footer },
            "You're receiving this because you just joined Colyr."
          )
        )
      )
    )
  );
}

const body = {
  backgroundColor: "#f9fafb",
  fontFamily: "-apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif",
};

const container = {
  maxWidth: "560px",
  margin: "40px auto",
  backgroundColor: "#ffffff",
  borderRadius: "12px",
  overflow: "hidden",
  boxShadow: "0 1px 3px rgba(0,0,0,0.08)",
};

const header = {
  backgroundColor: "#111827",
  padding: "24px 32px",
};

const logo = {
  color: "#ffffff",
  fontSize: "24px",
  fontWeight: "700",
  margin: "0",
  letterSpacing: "-0.5px",
};

const hero = {
  padding: "32px 32px 24px",
};

const heroHeading = {
  fontSize: "26px",
  fontWeight: "700",
  color: "#111827",
  margin: "0 0 12px",
};

const heroText = {
  fontSize: "16px",
  color: "#6b7280",
  lineHeight: "1.6",
  margin: "0",
};

const divider = {
  borderColor: "#f3f4f6",
  margin: "0",
};

const wordsSection = {
  padding: "24px 32px",
};

const sectionLabel = {
  fontSize: "12px",
  fontWeight: "600",
  color: "#9ca3af",
  textTransform: "uppercase",
  letterSpacing: "0.05em",
  margin: "0 0 16px",
};

const pillsRow = {
  display: "flex",
  flexWrap: "wrap",
  gap: "8px",
};

const pillColumn = {
  display: "inline-block",
  paddingRight: "8px",
  paddingBottom: "8px",
};

const pill = {
  display: "inline-block",
  padding: "6px 14px",
  borderRadius: "999px",
  fontSize: "13px",
  fontWeight: "600",
  color: "#ffffff",
};

const footer = {
  fontSize: "12px",
  color: "#9ca3af",
  padding: "0 32px 24px",
  margin: "0",
};
