export default function Label({ title, color }) {
  return <span className={`${color} px-3 text-sm py-2 rounded-full text-white`}>{title}</span>;
}
