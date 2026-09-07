import ProjectItem from "./ProjectItem";
import { motion } from "framer-motion";
import type { MouseEvent, MouseEventHandler } from "react";
import type { Project } from "@/app/src/constants/projectsData";

interface ProjectListProps {
    projects: Project[];
    startIndex: number;
    containerWidth: number;
    visibleProjects: number;
    onMouseEnterItem: (event: MouseEvent<HTMLLIElement>, description: string) => void;
    onMouseLeaveItem: MouseEventHandler<HTMLLIElement>;
    onToggle: (projectId: string) => void;
    activeProjectId: string | null;
}

export default function ProjectList({
    projects,
    startIndex,
    containerWidth,
    visibleProjects,
    onMouseEnterItem,
    onMouseLeaveItem,
    onToggle,
    activeProjectId,
}: ProjectListProps) {
    return (
        <div className="w-full overflow-hidden">
            <motion.ul
                id="Resume-items"
                className="flex flex-nowrap w-full"
                animate={{ x: `${startIndex * (containerWidth / visibleProjects)}px` }}
                transition={{ duration: 0.5, ease: "easeInOut" }}
            >
                {projects.map((project) => (
                    <ProjectItem
                        key={project.id}
                        project={project}
                        onMouseEnterItem={onMouseEnterItem}
                        onMouseLeaveItem={onMouseLeaveItem}
                        onToggle={onToggle}
                        activeProjectId={activeProjectId}
                        visibleProjects={visibleProjects}
                    />
                ))}
            </motion.ul>
        </div>
    );
}
