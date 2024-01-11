import Pill from '../Pill';

export default function TagList({
  tags,
  handleRemoveTag,
}: {
  tags: string[];
  handleRemoveTag: (tag: string) => void;
}) {
  return (
    <div className='p-2 border-2 border-neutral-500/20 rounded-sm basis-20'>
      {tags.map((pill, i) => (
        <Pill
          key={pill}
          index={i % tags.length}
          removePill={() => handleRemoveTag(pill)}
        >
          {pill}
        </Pill>
      ))}
    </div>
  );
}
