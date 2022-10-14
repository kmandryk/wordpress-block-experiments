/**
 * WordPress dependencies
 */
import { useBlockProps, RichText, InnerBlocks } from '@wordpress/block-editor';

const Save = ( props ) => {
	const {
		attributes: { content, bannerTitle },
	} = props;
	const blockProps = useBlockProps.save();

	return (
	<div>hello</div>
		);
};
export default Save;