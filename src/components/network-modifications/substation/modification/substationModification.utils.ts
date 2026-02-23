/**
 * Copyright (c) 2026, RTE (http://www.rte-france.com)
 * This Source Code Form is subject to the terms of the Mozilla Public
 * License, v. 2.0. If a copy of the MPL was not distributed with this
 * file, You can obtain one at http://mozilla.org/MPL/2.0/.
 */
import { InferType, object, string } from 'yup';
import {
    getFilledPropertiesFromModification,
    modificationPropertiesSchema,
    toModificationProperties,
} from '../../common/properties/propertyUtils';
import { FieldConstants, sanitizeString } from '../../../../utils';
import { SubstationModificationDto } from './substationModification.types';

export const substationModificationFormSchema = object()
    .shape({
        [FieldConstants.EQUIPMENT_NAME]: string().nullable(),
        [FieldConstants.COUNTRY]: string().nullable(),
    })
    .concat(modificationPropertiesSchema);

export type SubstationModificationFormData = InferType<typeof substationModificationFormSchema>;

export const substationModificationEmptyFormData: SubstationModificationFormData = {
    [FieldConstants.EQUIPMENT_NAME]: '',
    [FieldConstants.COUNTRY]: null,
    [FieldConstants.ADDITIONAL_PROPERTIES]: [],
};

export const substationModificationFormToDto = (
    substationForm: SubstationModificationFormData,
    originalDto?: SubstationModificationDto
): SubstationModificationDto => {
    return {
        type: 'SUBSTATION_MODIFICATION',
        equipmentId: originalDto?.equipmentId ?? '',
        equipmentName: { value: sanitizeString(substationForm.equipmentName) ?? undefined },
        country: substationForm.country != null ? { value: substationForm.country } : null,
        properties: toModificationProperties(substationForm),
    };
};

export const substationModificationDtoToForm = (
    substationDto: SubstationModificationDto
): SubstationModificationFormData => {
    return {
        equipmentName: substationDto.equipmentName?.value ?? '',
        country: substationDto.country?.value ?? null,
        AdditionalProperties: getFilledPropertiesFromModification(substationDto.properties),
    };
};
