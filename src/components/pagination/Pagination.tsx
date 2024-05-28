import { useEffect, useState, useMemo } from 'react';
import { getPageList } from '@/utils/pagination';
import Button from '@/components/button/Button';
import styles from './Pagination.module.css';

type Props = {
  currentPage: number;
  totalPage: number;
  onPageChange: (page: number) => void;
};

export default function Pagination({ currentPage, totalPage, onPageChange }: Props) {
  const [selectedPage, setSelectedPage] = useState(currentPage);

  const pageNumberList = useMemo(() => {
    return getPageList(selectedPage, totalPage);
  },[selectedPage, totalPage])

  useEffect(() => {
    onPageChange(selectedPage);
  }, [selectedPage, totalPage]);

  useEffect(() => {
    setSelectedPage(currentPage);
  }, [currentPage]);
  
  const handleClick = (page: number) => {
    setSelectedPage(page);
  }

  const handleLeftArrowClick = () => {
    setSelectedPage((prevState) => prevState - 1 );
  }

  const handleRightArrowClick = () => {
    setSelectedPage((prevState) => prevState + 1);
  }

  return (
    <>
      {totalPage !== 0 ? <div className={styles.container}>
        <Button variant='text' disabled={selectedPage === 1} onClick={handleLeftArrowClick}> &lt; </Button>
        <ul className={styles.paginationUl}>
          {pageNumberList.map((page, index) => {
            if(typeof page === 'number') {
              return (<li role='page' key={`page_${page}`}>
                <Button variant='text' selected={selectedPage === page} onClick={() => handleClick(page)}> {page} </Button>
              </li>);
            }
            else {
              return (<li key={`page_string_${index}`}>
                <span data-testid='span-none-page'> {page} </span>
              </li>);
            }
          })}
        </ul>
        <Button variant='text' disabled={selectedPage === totalPage} onClick={handleRightArrowClick}> &gt; </Button>
      </div> : null}
    </>
  );
}
