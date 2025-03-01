interface Configuration {
  api: string;
  email: string;
  linkedin: string;
  github: string;
  repo: string;
  assistant: Assistant;
  emailJS: EmailJS;
}

interface Assistant {
  intro: string;
}

interface EmailJS {
  serviceId: string;
  userId: string;
  templateForQuestion: string;
  templateForConnect: string;
}

export const configs: Configuration = {
  api: getEnvVar("REACT_APP_API"),
  email: getEnvVar("REACT_APP_EMAIL"),
  linkedin: getEnvVar("REACT_APP_LINKEDIN"),
  github: getEnvVar("REACT_APP_GITHUB"),
  repo: getEnvVar("REACT_APP_REPO"),
  assistant: {
    intro: getEnvVar("REACT_APP_ASSISTANT_INTRO"),
  },
  emailJS: {
    serviceId: getEnvVar("REACT_APP_EMAILJS_SERVICE_ID"),
    userId: getEnvVar("REACT_APP_EMAILJS_USER_ID"),
    templateForQuestion: getEnvVar(
      "REACT_APP_EMAILJS_TEMPLATE_ID_FOR_QUESTION"
    ),
    templateForConnect: getEnvVar("REACT_APP_EMAILJS_TEMPLATE_ID_FOR_CONNECT"),
  },
};

function getEnvVar(name: string): string {
  const value = process.env[name];
  if (value === undefined) {
    throw new Error(`Missing required env var configuration ${name}`);
  }
  return value;
}
