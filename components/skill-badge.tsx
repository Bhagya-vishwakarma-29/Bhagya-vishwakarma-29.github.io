interface SkillBadgeProps {
  name: string
}

export function SkillBadge({ name }: SkillBadgeProps) {
  return (
    <div className="inline-flex items-center px-3 py-1 rounded-full bg-gray-800 text-cyan-400 border border-gray-700 text-sm">
      {name}
    </div>
  )
}
