import {
  IonImg,
  IonGrid,
  IonCol,
  IonRow,
  IonChip,
  IonCard,
  IonCardHeader,
  IonCardTitle,
  IonCardContent,
  IonCardSubtitle,
  IonIcon,
} from "@ionic/react";
import { useMemo } from "react";
import { PlaceholderImg } from "../../data/AppMeta";
import "./FeaturedProjectsArea.scss";

interface FeaturedProjectTags {
  name: string;
  color?: string;
  icon?: string;
}

interface FeaturedProjectsObject {
  img?: string;
  title: string;
  subtitle: string;
  description: string;
  link?: string;
  tags?: FeaturedProjectTags[];
}

export interface ContainerProps {
  columns: number;
  projects: FeaturedProjectsObject[];
}

const FeaturedProjectsArea: React.FC<ContainerProps> = (props) => {
  const tableize = (projects: FeaturedProjectsObject[], columns: number) => {
    var row: number = 0;
    var table: any[] = [];
    projects.forEach((project, index) => {
      if (table[row]) {
        table[row] = [...table[row], project];
      } else {
        table[row] = [project];
      }
      if (index % columns === columns - 1) {
        row++;
      }
    });
    return table;
  };

  const getMarginClass = (index: number, length: number) => {
    var classList = "project-card-middle";
    if (index > 0 && index === length - 1) {
      classList = "project-card-right";
    } else if (index === 0 && index === length - 1) {
      classList = "project-card-left project-card-right";
    } else if (index === 0) {
      classList = "project-card-left";
    }
    return classList;
  };

  // calculate layout in memo for efficiency in rerenders
  const projectsTable = useMemo(
    () => tableize(props.projects, props.columns),
    [props.projects, props.columns]
  );
  return (
    <div className="featured-projects-container">
      <IonGrid>
        {projectsTable.map((projects, i) => (
          <IonRow key={i}>
            {projects.map((project: FeaturedProjectsObject, j: number) => (
              <IonCol
                key={j}
                size="12"
                size-sm={
                  projects.length > 1 ? (12 / props.columns).toString() : "12"
                }
                className="ion-no-padding"
              >
                <IonCard
                  className={
                    "project-card " +
                    getMarginClass(j, projectsTable[i].length) +
                    (i > 0 && i === projectsTable.length - 1
                      ? " bottom"
                      : " top")
                  }
                >
                  <IonImg
                    src={project.img ?? PlaceholderImg}
                    alt="project image"
                  />
                  <IonCardHeader>
                    <div className="header">
                      {project.tags &&
                        project.tags.map((tag, k) => (
                          <span className="skills" key={k}>
                            <IonChip key={k} color={tag.color ?? "primary"}>
                              {tag.icon && (
                                <IonIcon className="icon" icon={tag.icon} />
                              )}
                              {tag.name}
                            </IonChip>
                          </span>
                        ))}
                    </div>
                    <IonCardSubtitle className="subtitle">
                      {project.subtitle}
                    </IonCardSubtitle>
                    <IonCardTitle>{project.title}</IonCardTitle>
                  </IonCardHeader>

                  <IonCardContent className="content-container">
                    {project.description}
                  </IonCardContent>
                </IonCard>
              </IonCol>
            ))}
          </IonRow>
        ))}
      </IonGrid>
    </div>
  );
};

export default FeaturedProjectsArea;
