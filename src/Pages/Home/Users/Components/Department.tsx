import React, { useState, useEffect } from "react";
import { MdOutlineEdit, MdOutlineDeleteSweep } from "react-icons/md";
import image01 from "../../../../assets/landscape/Land01.jpg";
import image02 from "../../../../assets/landscape/Land02.jpg";
import image03 from "../../../../assets/landscape/Land03.jpg";
import image04 from "../../../../assets/landscape/Land09..jpg";
import image05 from "../../../../assets/landscape/Land05.jpg";
import image06 from "../../../../assets/landscape/Land06.jpg";
import image07 from "../../../../assets/landscape/Land07.jpg";
import image08 from "../../../../assets/landscape/Land08.jpg";
import Modal from "../../../../components/Modal/Modal";

const images = [
  //   image01,
  //   image02,
  //   image03,
  //image04,
  image05,
  // image06,
  //   image07,
  //   image08,
];

const getRandomizedImages = () => {
  const sortedImages = [...images];
  const firstImage = sortedImages.shift();
  sortedImages.push(firstImage as string);
  return sortedImages;
};

interface GridItem {
  id: number;
  name: string;
  description: string;
  updatedAt: string;
}

interface GridProps {
  items: GridItem[];
  onEdit?: (id: number) => void;
  onDelete?: (id: number) => void;
}

const GridComponent: React.FC<GridProps> = ({ items, onEdit, onDelete }) => {
  const [hoveredItemId, setHoveredItemId] = useState<number | null>(null);
  const itemImages: { [key: number]: string } = {};
  const [sortedImages, setSortedImages] = useState<string[]>(
    getRandomizedImages()
  );

  useEffect(() => {
    // This will run only once when the component is mounted
    setSortedImages(getRandomizedImages());
  }, []); // Empty dependency array ensures that the effect runs only once

  const handleMouseEnter = (id: number) => {
    setHoveredItemId(id);
  };

  const handleMouseLeave = () => {
    setHoveredItemId(null);
  };

  const getRandomImage = (id: number) => {
    if (!itemImages[id]) {
      const randomIndex = Math.floor(Math.random() * 1);
      itemImages[id] = sortedImages[randomIndex];
    }
    return itemImages[id];
  };

  const sortedItems = [...items].sort((a, b) => {
    const idA = a.id;
    const idB = b.id;
    const dateA = new Date(a.updatedAt).getTime();
    const dateB = new Date(b.updatedAt).getTime();

    // Sort by id first, then by updatedAt
    return idA - idB || dateB - dateA;
  });

  const [departmentName, setDepartmentName] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleEditClick = (id: number, name: string) => {
    setDepartmentName(name);
    setIsModalOpen(true);
    console.log("dhhdhdh");
  };

  return (
    <div className="grid-container" style={{ padding: 16 }}>
      {sortedItems?.map((item) => (
        <div
          key={item.id}
          className="grid-item"
          onMouseEnter={() => handleMouseEnter(item.id)}
          onMouseLeave={handleMouseLeave}
        >
          <div className="grid-item-image" onClick={() => console.log(item.id)}>
            <img src={getRandomImage(item.id)} alt={`${item.name} sample`} />
          </div>
          <div className="grid-item-content">
            <h3 className="grid-texts-depts">{item.name}</h3>
            <p className="grid-texts-depts-p">{item.description}</p>
            <div className="grid-item-actions">
              {hoveredItemId === item.id && (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "flex-end",
                    padding: 4,
                    gap: 4,
                  }}
                >
                  <MdOutlineEdit
                    onClick={() => handleEditClick(item.id, item.name)}
                    className="edit-icon"
                  />
                  <MdOutlineDeleteSweep
                    onClick={() => handleEditClick(item.id, item.name)}
                    className="edit-icon"
                  />
                </div>
              )}
            </div>
          </div>

          <Modal
            isOpen={isModalOpen}
            onOpen={() => setIsModalOpen(true)}
            onClose={() => setIsModalOpen(false)}
            formContent={
              <div>
                <button onClick={() => setIsModalOpen(false)}>close</button>
                <div>
                  <h4 style={{ textAlign: "center" }}>
                    Confirm you want to delete department
                    <br />
                    <span className="header-span">
                      {""} {departmentName}
                    </span>
                  </h4>
                  <p
                    className="grid-texts-depts-p"
                    style={{ textAlign: "center", fontSize: 14 }}
                  >
                    This action can not be undone
                  </p>
                  <div
                    style={{
                      display: "flex",
                      width: "100%",
                      justifyContent: "space-between",
                      gap: 12
                    }}
                  >
                    <button
                      style={{
                        display: "flex",
                        width: "100%",
                        justifyContent: "space-between",
                      }}
                      onClick={() => setIsModalOpen(false)}
                    >
                      close
                    </button>
                    <button
                      style={{
                        display: "flex",
                        width: "100%",
                        justifyContent: "space-between",
                      }}
                      onClick={() => setIsModalOpen(false)}
                    >
                      close
                    </button>
                  </div>
                </div>
              </div>
            }
          />
        </div>
      ))}
    </div>
  );
};

export default GridComponent;
