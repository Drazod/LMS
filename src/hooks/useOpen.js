import { useState } from "react";

const useOpen = () => {
  const [detailOpen, setDetailOpen] = useState(false);
  const [updateOpen, setUpdateOpen] = useState(false);
  const [deleteOpen, setDeleteOpen] = useState(false);

  const handleDetailOpen = () => setDetailOpen(!detailOpen);
  const handleUpdateOpen = () => setUpdateOpen(!updateOpen);
  const handleDeleteOpen = () => setDeleteOpen(!deleteOpen);

  return {
    detailOpen,
    updateOpen,
    deleteOpen,
    handleDetailOpen,
    handleUpdateOpen,
    handleDeleteOpen,
  };
};

export default useOpen;
