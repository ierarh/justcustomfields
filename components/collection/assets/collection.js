jQuery(document).ready(function(){
	console.log('test');
	initCollectionFields();
});


/**
 *	init fieldset fields grid and add form
 */
function initCollectionFields(){
	
	// init add form
	jQuery('form.jcform_add_collection_field').submit(function(e){
		e.preventDefault();
		
		var data = { action: 'jcf_add_collection_field' };
		
		jQuery(this).find('input,select').each(function(i, input){
			data[ jQuery(input).attr('name') ] = jQuery(input).val();
		})
		data['fieldset_id'] = jQuery('input[name=fieldset_id]').val();
		
		var loader = jQuery(this).find('img.ajax-feedback');
		
		jcf_ajax(data, 'html', loader, function(response){
			jcf_show_ajax_container( response );
		})
		
		return false;
	});
	
	// init save button on edit form
	jQuery('#jcform_edit_collection_field').live('submit', function(e){
		e.preventDefault();

		// get query string from the form
		var query = jQuery('#jcform_edit_collection_field').formSerialize();
		var data = 'action=jcf_collection_save_field' + '&' + query;

		var loader = jQuery(this).find('img.ajax-feedback');
		
		// send request
		jcf_ajax(data, 'json', loader, function(response){
			
			console.log(response);
			var fieldset = jQuery('#the-collection-list-' + response.collection_id);
			
			if( response.is_new ){
				// check if fieldset is empty
				if( fieldset.find('td').size() == 1 ){
					// remove empty row container
					fieldset.find('tr').remove();
				}
				// add new row
				var html;
				html = '<tr id="collection_field_row_' + response.id + '">';
				html += '	<td class="check-column"><span class="drag-handle">move</span></td>';
				html += '<td><strong><a href="#" rel="' + response.id + '">' + response.instance.title + '</a></strong>';
				html += '	<div class="row-actions">';
				html += '		<span class="edit"><a href="#" rel="' + response.id + '">'+ jcf_textdomain.edit +'</a></span> |';
				html += '		<span class="delete"><a href="#" rel="' + response.id + '">'+ jcf_textdomain.delete +'</a></span>';
				html += '	</div>';
				html += '</td>';
				html += '<td>'+response.instance.slug+'</td>';
				html += '<td>'+response.id_base+'</td>';
				html += '<td>'+( (response.instance.enabled)? jcf_textdomain.yes : jcf_textdomain.no )+'</td>';
				fieldset.append(html);
			}
			
			// update fieldset row
			var row = jQuery('#collection_field_row_' + response.id);
			row.find('strong a').text(response.instance.title);
			row.find('td:eq(2)').text(response.instance.slug);
			row.find('td:eq(4)').text( (response.instance.enabled)? jcf_textdomain.yes : jcf_textdomain.no );
			
			// close add box at the end
			jcf_hide_ajax_container();
		})
		
		return false;
	});
	/*
	// delete button
	jQuery('#jcf_fieldsets tbody span.delete a').live('click', function(){
		if( confirm( jcf_textdomain.confirm_field_delete ) ){
			var row = jQuery(this).parents('tr:first');
			var f_id = jQuery(this).parents('tbody:first').attr('id').replace('the-list-', '');
			var data = {
				action: 'jcf_delete_field',
				fieldset_id: f_id,
				field_id: jQuery(this).attr('rel')
			};
			
			jcf_ajax(data, 'json', null, function(response){
				row.remove();
				// close edit box if exists
				jcf_hide_ajax_container();
			});
		}
		return false;
	})
	
	// edit button
	jQuery('#jcf_fieldsets tbody span.edit a, #jcf_fieldsets tbody strong > a').live('click', function(){
		var f_id = jQuery(this).parents('tbody:first').attr('id').replace('the-list-', '');
		var data = {
			action: 'jcf_edit_field',
			fieldset_id: f_id,
			field_id: jQuery(this).attr('rel')
		};
			
		jcf_ajax(data, 'html', null, function(response){
			
			jcf_show_ajax_container(response);
			
		});
		
		return false;
	})
	
	// delete button in edit form
	jQuery('#jcform_edit_field a.field-control-remove').live('click', function(e){
		var field_id = jQuery(this).parents('form:first').find('input[name=field_id]').val();
		var row = jQuery('#field_row_' + field_id);
		row.find('span.delete a').click();
		return false;
	});
	
	// init sortable
	jQuery('#jcf_fieldsets tbody').sortable({
		handle: 'span.drag-handle',
		opacity:0.7,
		placeholder: 'sortable_placeholder',
		start: function (event, ui) { 
			ui.placeholder.html('<td colspan="4"><br>&nbsp;</td>');
		},
		stop: function(event, ui){
			// ui.item - item in the list
			var order = '';
			var fieldset = jQuery(ui.item).parent();
			var f_id = fieldset.attr('id').replace('the-list-', '');
			fieldset.find('tr').each(function(i, tr){
				order += jQuery(tr).attr('id').replace('field_row_', '') + ',';
			});
			
			var data = {
				'action': 'jcf_fields_order',
				'fieldset_id': f_id,
				'fields_order': order
			};

			//pa(data);
			jcf_ajax(data, 'json');
		}
	});*/
}