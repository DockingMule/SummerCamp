import React from 'react';

export default function Map() {
  return (
    <iframe
      style={{
        width: '100%',
        height: '100%',
        border: 0,
      }}
      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d1325.6169897731074!2d-75.10678544412546!3d39.849365711258024!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x89c6ce350ce638bf%3A0xf91346f84eada73b!2sDeptford%20Sports%20Complex!5e0!3m2!1sen!2sus!4v1766526093199!5m2!1sen!2sus"
      allowFullScreen
      loading="lazy"
      referrerPolicy="no-referrer-when-downgrade"
    />
  );
}