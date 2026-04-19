import { Link } from "react-router-dom";

export default function ProjectCard({ project }) {
  return (
    <Link to={`/projects/${project.id}`} className="group block">

      {/* 圖片 */}
      <div className="relative overflow-hidden">

        <div className="aspect-[3/3] overflow-hidden">
          <img
            src={project.img}
            className="
            w-full h-full object-cover
            transition duration-700 ease-out
            group-hover:scale-[1.05]
            "
          />
        </div>

      </div>

      {/* 文字 */}
      <div className="p-5">

        <p className="text-[11px] tracking-[0.25em] text-[#999] mb-2 uppercase">
          {project.category}
        </p>

        <h3 className="
        text-[15px]
        leading-[1.6]
        text-[#111]
        group-hover:text-[#c9a25b]
        transition
        ">
          {project.title}
        </h3>

        <p className="text-[13px] text-[#666] mt-3 leading-relaxed line-clamp-3">
          {project.desc}
        </p>

        <div className="mt-4 text-[11px] tracking-[0.2em] text-[#999]">
          READ MORE →
        </div>

      </div>

    </Link>
  );
}