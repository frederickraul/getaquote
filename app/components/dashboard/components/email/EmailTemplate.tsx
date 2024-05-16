'use client';

interface EmailTemplateProps {
  firstName: string;
}

const EmailTemplate: React.FC<EmailTemplateProps> = ({
  firstName,
}) => {
  return(
    <div>
    <h1>Welcome, {firstName}!</h1>
  </div>
  )
}
  

export default EmailTemplate;