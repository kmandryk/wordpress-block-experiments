/**
 * WordPress dependencies
 */

import { useBlockProps, RichText, InnerBlocks } from '@wordpress/block-editor';
import { TextControl } from '@wordpress/components';

const Edit = ( props ) => {
	const {
		attributes,
		setAttributes,
	} = props;

	const blockProps = useBlockProps();

	const onChangeContent = ( newContent ) => {
		setAttributes( { content: newContent } );
	};
	
	const onChangeBannerTitle = ( newContent ) => {
		setAttributes( { bannerTitle: newContent } );
	};
	
	const MY_TEMPLATE = [
		[ 'core/image', {} ]
	];
	
	return (
		<div className="row middle-xs">
		  <div className="col-sm-12 col-md-6">
			<div className="sideImageText">
					<RichText className="bannerTitle"
						tagName="h1" // The tag here is the element output and editable in the admin
						value={ attributes.bannerTitle } // Any existing content, either from the database or an attribute default
						allowedFormats={ [  ] } // Allow the content to be made bold or italic, but do not allow other formatting options
						onChange={ onChangeBannerTitle } // Store updated content as a block attribute
						placeholder={ 'Heading...' } // Display this text before any content has been added by the user
					/>
					<RichText className="subTitle"
						tagName="div" // The tag here is the element output and editable in the admin
						value={ attributes.content } // Any existing content, either from the database or an attribute default
						allowedFormats={ [  ] } // Allow the content to be made bold or italic, but do not allow other formatting options
						onChange={ onChangeContent } // Store updated content as a block attribute
						placeholder={ 'Subtitle...' } // Display this text before any content has been added by the user
					/>
			</div>
		  </div>
		  <div className="col-sm-12 col-md-6">
			<InnerBlocks
                template={ MY_TEMPLATE }
                templateLock="all"
            />
		  </div>
		</div>
	);
};
export default Edit;