interface ButtonProps {
    children: React.ReactNode
    onClick?: () => void
    variant?: 'primary' | 'secondary'
    disabled?: boolean
}

export default function Button({ children, onClick, variant = 'primary', disabled = false }: ButtonProps) {
    const baseClass =
        'px-4 py-2 font-medium rounded transition duration-200 focus:outline-none focus:ring'
    const variantClass =
        variant === 'primary'
            ? 'bg-blue-500 text-white hover:bg-blue-600 focus:ring-blue-300'
            : 'bg-gray-300 text-black hover:bg-gray-400 focus:ring-gray-200'
    const disabledClass = disabled ? 'opacity-50 cursor-not-allowed' : ''

    return (
        <button
            className={`${baseClass} ${variantClass} ${disabledClass}`}
            onClick={onClick}
            disabled={disabled}
        >
            {children}
        </button>
    )
}
