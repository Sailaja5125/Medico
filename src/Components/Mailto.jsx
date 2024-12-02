// Mailto.js (create a new file)
import React from 'react';

const Mailto = ({ email, subject = '', body = '', children }) => {
  const params = [];
  if (subject) params.push(`subject=${encodeURIComponent(subject)}`);
  if (body) params.push(`body=${encodeURIComponent(body)}`);

  const mailtoLink = `mailto:${email}${params.length > 0 ? `?${params.join('&')}` : ''}`;

  return <a href={mailtoLink}>{children}</a>;
};

export default Mailto;
