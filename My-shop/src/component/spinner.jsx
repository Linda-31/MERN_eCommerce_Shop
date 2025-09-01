import React from 'react';

const Spinner = () => {
    return (
        <div style={{ display: 'flex', justifyContent: 'center', marginTop: '5rem', marginBottom:"15rem" }}>
            <div className="loader"></div>
            <style>{`
.loader {
  display: inline-block;
  width: 50px;
  height: 50px;
}
.loader:after {
  content: " ";
  display: block;
  width: 50px;
  height: 50px;
  margin: 1px;
  border-radius: 50%;
  border: 6px solid #065084;
  border-color: #065084 transparent #065084 transparent;
  animation: dual-ring 1.2s linear infinite;
}
@keyframes dual-ring {
  0% { transform: rotate(0deg); }
  100% { transform: rotate(360deg); }
}
`}</style>

        </div>

    );
};

export default Spinner;
