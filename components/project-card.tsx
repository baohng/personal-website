import Link from "next/link";

import { Badge } from "@/components/ui/badge";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import type { Project } from "@/lib/types";

export function ProjectCard({ project }: { project: Project }) {
  return (
    <Card className="flex h-full flex-col overflow-hidden">
      {project.cover_image_url ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={project.cover_image_url}
          alt={project.title}
          className="h-40 w-full object-cover"
        />
      ) : null}
      <CardHeader>
        <CardTitle>{project.title}</CardTitle>
        {project.company_name ? (
          <CardDescription>{project.company_name}</CardDescription>
        ) : null}
      </CardHeader>
      <CardContent className="flex flex-1 flex-col gap-4">
        {project.description ? (
          <p className="text-sm text-muted-foreground">{project.description}</p>
        ) : null}
        {project.tech_stack.length > 0 ? (
          <div className="flex flex-wrap gap-1.5">
            {project.tech_stack.map((tag) => (
              <Badge key={tag} variant="outline">
                {tag}
              </Badge>
            ))}
          </div>
        ) : null}
        <div className="mt-auto flex flex-wrap gap-3 pt-2 text-sm">
          {project.github_url ? (
            <Link
              href={project.github_url}
              target="_blank"
              rel="noreferrer"
              className="text-primary underline-offset-4 hover:underline"
            >
              GitHub
            </Link>
          ) : null}
          {project.demo_url ? (
            <Link
              href={project.demo_url}
              target="_blank"
              rel="noreferrer"
              className="text-primary underline-offset-4 hover:underline"
            >
              Live demo
            </Link>
          ) : null}
        </div>
      </CardContent>
    </Card>
  );
}
