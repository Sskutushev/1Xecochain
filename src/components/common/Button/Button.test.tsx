import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Button, { type ButtonProps } from './Button';

const defaultProps: ButtonProps = {
  children: 'Test Button',
};

describe('Button', () => {
  it('renders button text correctly', () => {
    render(<Button {...defaultProps} />);
    expect(screen.getByText('Test Button')).toBeInTheDocument();
  });

  it('calls onClick when clicked', () => {
    const onClick = vi.fn();
    render(<Button {...defaultProps} onClick={onClick} />);
    
    fireEvent.click(screen.getByText('Test Button'));
    expect(onClick).toHaveBeenCalledTimes(1);
  });

  it('applies correct variant classes', () => {
    const { rerender } = render(<Button {...defaultProps} variant="primary" />);
    const button = screen.getByText('Test Button');
    
    expect(button).toHaveClass('bg-primary-green');
    
    rerender(<Button {...defaultProps} variant="secondary" />);
    expect(screen.getByText('Test Button')).toHaveClass('bg-white');
    
    rerender(<Button {...defaultProps} variant="outline" />);
    expect(screen.getByText('Test Button')).toHaveClass('border-2');
  });

  it('applies disabled state correctly', () => {
    const onClick = vi.fn();
    render(<Button {...defaultProps} disabled onClick={onClick} />);
    
    const button = screen.getByText('Test Button');
    expect(button).toBeDisabled();
    fireEvent.click(button);
    expect(onClick).not.toHaveBeenCalled();
  });
});