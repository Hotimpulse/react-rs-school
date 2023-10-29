import React from 'react';

export class LoaderSpinner extends React.Component {
  render() {
    return (
      <>
        <div className="flex items-center justify-center">
          <div className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin"></div>
        </div>
      </>
    );
  }
}
