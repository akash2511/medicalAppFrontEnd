import React, { useEffect, useRef } from 'react';

/* Custom Errors */

import customError from 'custom-error'

export const AuthError = customError('AuthError')
export const ApiError = customError('ApiError')
// export const backendUrl = 'http://dev-v3.sealtabs.com:3004'
// export const backendUrlNew = 'http://dev-v3.sealtabs.com:3004'
export const backendUrl = 'http://dev-v3.sealtabs.com:3003'
export const backendUrlNew = 'http://dev-v3.sealtabs.com:3003'
export const backendUrlCWX = 'https://dev-api.coursewarex.com'
export const backendUrl = 'http://dev-v3.sealtabs.com:3003'
export const backendUrlNew = 'http://dev-v3.sealtabs.com:3003'

// /* API Response Helpers */
//
export const checkStatus = response => {
    if (response.status >= 200 && response.status < 300) return response
    if (401 === response.status && response.statusText !== '') {
        let error = new AuthError(response.statusText)
        throw error
    } else {
        let error = new ApiError(response.statusCode)
        throw error
    }
}

export const parseJSON = response => response.json()

export const composeAuth = jwt => 'Bearer ' + jwt

export const uniqueParentGroups = groups => {
    return groups
        .map(group => group.parent_group)
        .filter((group, index, array) => {
            /*if item is the first instance of that element in
          the array then return it*/
            if (array.indexOf(group) === index) return true
            return false
        })
}

export const filterSectionsByParent = (parent, groups) => {
    return getSections(parent, groups).map(group => ({
        id: group._id,
        name: group.group_name
    }))
}

/* TODO will refactor to remove this later*/
export const filterSections = (parent, groups) => {
    return getSections(parent, groups).map(group => group.group_name)
}

export const getSections = (parent, groups) => {
    if (parent !== '')
        return groups.filter(group => {
            if (parent === group.parent_group) return true
            return false
        })
    else return []
}

// get subject Ids of a group
export const getGroupSubjectIds = (groupsById, groupId) => {
    if (Object.keys(groupsById).length === 0 || !groupId) return []
    const { subjects } = Object.assign(
        { subjects: [] },
        groupsById[groupId]
    )
    return subjects.map(subjectObj => subjectObj.subject_id)
}

// map subjects names along with the elective names
export const getSubjectNames = (subjectsById, subjectId) => {
    if (
        Object.keys(subjectsById).length === 0 ||
        subjectId === '' ||
        !subjectsById[subjectId]
    )
        return 'Subject Not Found'
    if (subjectsById[subjectId].is_main === true) {
        return subjectsById[subjectId].name
    }
    let mainSubject = {}
    const hasMainSubject = Object.keys(subjectsById).some(id => {
        if (subjectsById[id].electives.includes(subjectId)) {
            mainSubject = subjectsById[id]
            return true
        }
        return false
    })
    if (!hasMainSubject) return 'Elective Not Found'
    const name = `${subjectsById[subjectId].name} - ${mainSubject.name}`
    return name
}

// get hour arr for the selected day
export const getHourArrForSelectedDay = (hourArr, selectedDay) => {
    if (hourArr.length === 0 || !selectedDay) return []
    return hourArr.filter(hourObj => hourObj.day === selectedDay)
}

export const getById = (data, field = '_id') => {
    let byId = {}
    data.forEach(s => {
        byId[s[field]] = s
    })
    return byId
}

export const getAllIds = (data, field = '_id') => {
    let allIds = []
    data.forEach(s => {
        allIds.push(s[field])
    })
    return allIds
}
// get groupObj for the given student Id
export const getGroupPerStudentId = (studentId, groupsById) => {
    if (!studentId || Object.keys(groupsById).length === 0) return undefined
    const groupId = Object.keys(groupsById).find(groupId => {
        return groupsById[groupId].students.includes(studentId)
    })
    return groupsById[groupId]
}

export const getHomeworkFormData = files => {
    let formData = new FormData()
    for (let i = 0; i < files.length; i++) {
        const file = files[i]
        let uriParts = file.uri.split('.');
        let fileType = uriParts[uriParts.length - 1];
        formData.append('file', {
            uri: file.uri,
            name: `${file.name}`,
            type: `image/${fileType}`,
        });
    }
    return formData
}

export const getEmailFormData = files => {
    let formData = new FormData()
    for (let i = 0; i < files.length; i++) {
        const file = files[i]
        let uriParts = file.uri.split('.');
        let fileType = uriParts[uriParts.length - 1];
        formData.append('file', {
            uri: file.uri,
            name: `${file.name}`,
            type: `image/${fileType}`,
        });
    }
    return formData
}

export const usePrevious = (value) => {
    const ref = useRef();
    useEffect(() => {
        ref.current = value;
    });
    return ref.current;
}

export const getByField = (collection, property) => {
    var i = 0, val, index,
        values = [], result = [];
    if (collection.length > 0) {
        for (; i < collection.length; i++) {
            val = collection[i][property];
            index = values.indexOf(val);
            if (index > -1)
                result[index].push(collection[i]);
            else {
                values.push(val);
                result.push([collection[i]]);
            }
        }
    }
    return result;
}

export const toTitleCase = (str) => {
    return str.replace(
        /\w\S*/g,
        function (txt) {
            return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
        }
    );
}

export const useInterval = (callback, delay) => {
    const savedCallback = useRef()

    // Remember the latest callback.
    useEffect(() => {
        savedCallback.current = callback
    }, [callback])

    // Set up the interval.
    useEffect(() => {
        function tick() {
            savedCallback.current()
        }
        if (delay !== null) {
            let id = setInterval(tick, delay)
            return () => clearInterval(id)
        }
    }, [delay])
}