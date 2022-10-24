/**
 * Retrieves the translation of text.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-i18n/
 */
import { __ } from '@wordpress/i18n';
import { dateI18n, format, __experimentalGetSettings } from '@wordpress/date';

/**
 * React hook that is used to mark the block wrapper element.
 * It provides all the necessary props like the class name.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/packages/packages-block-editor/#useblockprops
 */
import { useBlockProps } from '@wordpress/block-editor';

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * Those files can contain any CSS code that gets applied to the editor.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './editor.scss';

import { RawHTML } from '@wordpress/element';
import { useSelect } from '@wordpress/data';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @return {WPElement} Element to render.
 */
 export default function Edit( { attributes } ) {

	const { 
		numberOfItems, 
		displayDate, 
		displayExcerpt, 
		displayThumbnail 
	} = attributes;
	const posts = useSelect(
		( select ) => {
			return select( 'core' ).getEntityRecords( 'postType', 'post', {
				'per_page': numberOfItems,
				'_embed': true
			});
		},
		[ numberOfItems ]
	);

	console.log(posts);

	return (
		<div { ...useBlockProps() }>
	<ul>
		{ posts && posts.map((post) => {
			return (
				<li key={ post.id }>
					<h5>
						<a href={ post.link }>
							{ post.title.rendered ? (
								<RawHTML>
									{ post.title.rendered }
								</RawHTML>
							) : (
								__( 'Default title', 'author-plugin' )
							)}
						</a>
					</h5>
					{ 
						displayDate && (
							<time
								className='wp-block-author-box-author-plugin__post-date'
								dateTime={ format( 'c', post.date_gmt ) }
							>
								{ dateI18n(
									__experimentalGetSettings().formats.date, 
									post.date_gmt
								)}
							</time>
						) 
					}
					{
						displayExcerpt &&
						post.excerpt.rendered && (
								<RawHTML>
									{ post.excerpt.rendered }
								</RawHTML>
						)
					}
					{
						displayThumbnail && 
						post._embedded && 
						post._embedded['wp:featuredmedia'] &&
						post._embedded['wp:featuredmedia'][0] &&
						<img 
						className='wp-block-author-box-author-plugin__post-thumbnail'
							src={ post._embedded['wp:featuredmedia'][0].media_details.sizes.medium.source_url }
							alt={ post._embedded['wp:featuredmedia'][0].alt_text }
						/>
					}
				</li>
			)
		})}
	</ul>
</div>
	);
}