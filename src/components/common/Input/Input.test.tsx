import { describe, it, expect } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Input from './Input';

describe('Input', () => {
  it('renders label and placeholder correctly', () => {
    render(<Input label="Test Label" placeholder="Test Placeholder" />);
    
    expect(screen.getByText('Test Label')).toBeInTheDocument();
    expect(screen.getByPlaceholderText('Test Placeholder')).toBeInTheDocument();
  });

  it('handles value changes', () => {
    const onChange = (e: React.ChangeEvent<HTMLInputElement>) => e.target.value;
    render(<Input value="test value" onChange={onChange} />);
    
    const input = screen.getByDisplayValue('test value');
    expect(input).toBeInTheDocument();
  });

  it('displays error message when error prop is provided', () => {
    render(<Input label="Test Label" error="Test Error" />);
    
    expect(screen.getByText('Test Error')).toBeInTheDocument();
  });

  it('applies disabled state correctly', () => {
    render(<Input disabled />);
    
    const input = screen.getByRole('textbox');
    expect(input).toBeDisabled();
  });

  it('handles onChange event', () => {
    const handleChange = vi.fn();
    render(<Input onChange={handleChange} />);
    
    const input = screen.getByRole('textbox');
    fireEvent.change(input, { target: { value: 'new value' } });
    
    expect(handleChange).toHaveBeenCalledTimes(1);
  });
});