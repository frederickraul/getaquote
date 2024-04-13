import React, { useEffect, useRef } from 'react';
import cx from 'classnames';
import { IoIosArrowDown, IoIosArrowUp, IoMdArrowDown } from 'react-icons/io';
import { MdArrowDropDown, MdArrowDropUp } from 'react-icons/md';
import Button from './Button';

export interface IDropdownOption {
	label: string | number;
	labelValue: string | number;
}

interface IDropdownProps {
	name?: string;
	textLeft?:boolean;
	options: IDropdownOption[];
	required?: boolean;
	tabIndex?: number;
	className?: string;
	type?: string;
	placeHolder?: string;
	labelName: string;
	onChange:(value:string|number)=>void;
}

function Dropdown({
	labelName,
	name,
	textLeft,
	options,
	placeHolder,
	type,
	required,
	className,
	tabIndex,
	onChange,
}: IDropdownProps) {
	const [isFocused, setIsFocused] = React.useState(false);
	const [selectedItem, setSelectedItem] = React.useState<string | number>(labelName);
	const wrapperRef = useRef<any>(null);

	useEffect(() => {
		function handleClickOutside(event: any) {
			if (wrapperRef.current && !wrapperRef.current.contains(event.target)) {
				setIsFocused(false);
			}
		}

		document.addEventListener('mousedown', handleClickOutside);
		return () => {
			document.removeEventListener('mousedown', handleClickOutside);
		};
	}, [wrapperRef]);

	const onValueChange = (selectedValue: string | number, label: string | number) => {
		onChange(selectedValue);
		setSelectedItem(label);
		setIsFocused(false);
	};
	React.useEffect(() => {
		setIsFocused(false);
	}, [selectedItem]);

	const onClear = (e: any) => {
		e.stopPropagation();
		//setSelectedItem(placeHolder);
		setIsFocused(false);
	};

	return (
		<div ref={wrapperRef} className="border-[#979797] relative w-[100%]">
            <Button 
				textLeft={textLeft}
                label={String(selectedItem)} 
                icon={isFocused ? IoIosArrowUp : IoIosArrowDown}
                iconRight
                outline
                onClick={()=>{setIsFocused(true)}} 
                    />
			{isFocused && (
				<ul className="absolute w-auto mt-2 border-1px z-10 shadow-xl">
					{options.map(({ label, labelValue }) => (
						<li
                            key={label}
							onClick={() => onValueChange(labelValue, label)}
							className="
                                cursor-pointer
                                whitespace-nowrap
                                py-2
                                px-8
                                rounded-sm 
                                bg-white 
                                transition 
                                relative 
                                flex 
                                hover:bg-black
                                hover:text-white
                                ">
							{label}
						</li>
					))}
				</ul>
			)}
		</div>
	);
}

export default Dropdown;

