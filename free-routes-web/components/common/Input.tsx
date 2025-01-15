interface InputProps {
    label: string
    value: string
    onChange: (value: string) => void
    placeholder?: string
    type?: 'text' | 'email' | 'password'
}

export default function Input({ label, value, onChange, placeholder = '', type = 'text' }: InputProps) {
    return (
        <div className="mb-4">
            <label className="block text-sm font-medium mb-2">{label}</label>
            <input
                type={type}
                value={value}
                onChange={(e) => onChange(e.target.value)}
                placeholder={placeholder}
                className="w-full px-3 py-2 border border-gray-300 rounded shadow-sm focus:outline-none focus:ring focus:ring-blue-200"
            />
        </div>
    )
}
