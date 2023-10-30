import React, { MouseEvent } from 'react';

interface IButtonProps {
  label: string;
  onClick?: (event: MouseEvent<HTMLButtonElement>) => void;
  type?: string;
}
export class MyButton extends React.Component<IButtonProps> {
  render(): React.ReactNode {
    const { label, onClick } = this.props;

    return (
      <button className="bg-blue-500 text-white rounded" onClick={onClick}>
        {label}
      </button>
    );
  }
}
