const getResults = (id) => {
	fetch(`https://www.dnd5eapi.co${id}`)
		.then(response => response.json())
		.then((data) => {

			// Looping through the JSON data 
			$.each(data.results, function(i, f) {
				fetch(`https://www.dnd5eapi.co${f.url}`)
					.then(response => response.json())
					.then((data) => {
						const result = {
							index: data.index,
							name: data.name,
							level: data.level,
							school: data.school.name,
							casting_time: data.casting_time,
							range: data.range,
							components: data.components,
							duration: data.duration,
							attack: data.attack_type,
							save: data.dc,
							damage: data.damage,
							higher_level: data.higher_level,
							classes: data.classes,
							source: f.url
						}


						var table_row = `
						<tr>
							<td>
								<a href='5e-srd-spells/entry-page.html?name=${result.index}' target='_blank'>${result.name}</a>
							</td>
							<td>
								Level: ${result.level}
							</td>
							<td>
								<img class='directory-page-dynamic-table-entry-image' src=/resources/images/${result.school}.png><br>
								${result.school}
							</td>
							<td>
								${result.casting_time}
							</td>
							<td>
								${result.range}
							</td> 
							<td>
								${result.components}
							</td>
							<td>
								${result.duration}
							</td>
							`

						if (result.attack != undefined) {
							table_row += `
							<td>
								${result.attack}
							</td>
						`
						} else if (result.save != undefined) {
							table_row += `
							<td>
								${result.save.dc_type.name}
							</td>
							`
						} else {
							table_row += `
							<td>
								NA
							</td>
							`
						}

						if (result.damage != undefined) {
							table_row += `
							<td>
								${result.damage.damage_type.name}
							</td>
						`
						} else {
							table_row += `
							<td>
								NA
							</td>
							`
						}

						if (result.higher_level.length != 0) {
							table_row += `
							<td>
								True
							</td>
						`
						} else {
							table_row += `
							<td>
								False
							</td>
							`
						}
						table_row += `
							<td>
							`

						for (let z = 0; z < result.classes.length; z++) {
							table_row += `
							${result.classes[z].name}, 
							`
						}
						table_row += `
							</td>
							<td>
								${result.source}
							</td>
						</tr>
						`
						$(table_row).appendTo("#directory-page-dynamic-table-content tbody");
					});
			});
		});
}

function CallApiSearchEngine() {
	var query = document.getElementById('5e-srd-api-searchbox').value;
	// document.getElementById('blended-description-div').innerHTML = query;
	$('#directory-page-dynamic-table-content tr').remove();
	getResults(`/api/spells/?name=${query}`);
}

getResults("/api/spells/");
