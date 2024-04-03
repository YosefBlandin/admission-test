import * as React from 'react';
import ImageList from '@mui/material/ImageList';
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';

export default function StandardImageList({
    defaultValue,
    list,
    handleChange,
}: {
    list: { img: string; title: string }[];
    defaultValue: string;
    handleChange: (img: string) => any;
}) {
    return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <ImageList
                sx={{ width: 500, height: 450 }}
                cols={3}
                rowHeight={164}
            >
                {list &&
                    list.map((item) => (
                        <ImageListItem
                            key={item.img}
                            style={{
                                cursor: 'pointer',
                                border:
                                    defaultValue === item.img
                                        ? '3px solid red'
                                        : 'none',
                            }}
                            onClick={() => handleChange(item.img)}
                        >
                            <img
                                src={`${item.img}?w=164&h=164&fit=crop&auto=format`}
                                srcSet={`${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
                                alt={item.title}
                                loading="lazy"
                            />
                            <ImageListItemBar title={item.title} />
                        </ImageListItem>
                    ))}
            </ImageList>
        </div>
    );
}
